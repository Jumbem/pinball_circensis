// Choose a cache name
const cacheName = 'cache-v1'

// Necessário trocar lista para meus assets
 const precacheResources = [
  './',
   './assets/mp3/ost/cantarolando.mp3',
   './assets/mp3/ost/charlie-chaplin-walk.mp3',
   './assets/mp3/ost/gameover.mp3',
   './assets/mp3/ost/hyperfun.mp3',
   './assets/mp3/ost/o-topete.mp3',
   './assets/mp3/ost/so-nas-pretas.mp3',
   './assets/mp3/ost/tiro-e-queda.mp3',
   './assets/mp3/sfx/botao.mp3',
   './assets/png/backgrounds/abertura2.png',
   './assets/png/backgrounds/creditos.png',
   './assets/png/backgrounds/gameover.png',
   './assets/png/backgrounds/jogar.png',
   './assets/png/backgrounds/newhighscore.png',
   './assets/png/backgrounds/placar.png',
   './assets/png/backgrounds/ranking.png',
   './assets/png/buttons/confirmar.png',
   './assets/png/buttons/creditos.png',
   './assets/png/buttons/down.png',
   './assets/png/buttons/fim.png',
   './assets/png/buttons/highscore.png',
   './assets/png/buttons/jogar.png',
   './assets/png/buttons/ranking.png',
   './assets/png/buttons/up.png',
   './assets/png/buttons/voltar.png',
   './assets/png/favicon/128.png',
   './assets/png/favicon/192.png',
   './assets/png/favicon/256.png',
   './assets/png/favicon/384.png',
   './assets/png/favicon/512.png', 
   './assets/png/other/bianca.png',
   './assets/png/other/junior.png',
   './assets/png/other/logo.png',
   './assets/png/other/sona-bianca-300.png',
   './assets/png/other/sona-junior-300.png',

]

self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})