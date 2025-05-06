export default class precarregamento extends Phaser.Scene {

  constructor () {
    super('precarregamento')
  }

// PRIMEIRA VERSÃO DA BARRA DE PROGRESSO (BOI)
//  init () {
//   this.add.rectangle(225, 400, 425, 32).setStrokeStyle(1, 0xffffff)
//    const progresso = this.add.rectangle(200 - 115, 400, 6, 24, 0xffffff)
//    this.load.on('progress', (progress) => {
//      progresso.width = 2 + (230 * progress)
//    })
//   }

// SEGUNDA VERSÃO DA BARRA DE PROGRESSO (CHATGPT)
//  init () {
// Centralizando a moldura da barra
//    this.add.rectangle(225, 150, 234, 16).setStrokeStyle(1, 0xffffff)
// Centralizando o início da barra de progresso com base na largura da moldura
//    const progresso = this.add.rectangle(225 - 234 / 2 + 1, 150, 2, 14, 0xffffff)
// Atualizando a largura da barra conforme o progresso
//    this.load.on('progress', (progress) => {
//      progresso.width = 2 + (230 * progress)
//    })
//  }
  
  init () {
    this.add.rectangle(225, 400, 425, 32).setStrokeStyle(1, 0xffffff)

    // Corrigido: começa logo dentro da moldura (com 1px de margem à esquerda)
    const progresso = this.add.rectangle(225 - 425 / 2 + 1, 400, 6, 24, 0xffffff).setOrigin(0, 0.5)

    this.load.on('progress', (progress) => {
      progresso.width = 2 + (421 * progress) // 425 - 4 de margem total
    })
  }
  
  preload () {
    this.load.setPath('assets/')
    this.load.image('fundo', 'assets/abertura-bg.png')
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
        frameWidth: 40,
        frameHeight: 29
    })
   }

  create () {
    this.scene.start('sala')
   }

  update () { }
}
