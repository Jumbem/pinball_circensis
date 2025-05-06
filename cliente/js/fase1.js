export default class fase1 extends Phaser.Scene {

  constructor () {
    super('fase1')
  }

  init () { }

  preload () { 
    this.load.audio("ost", "assets/ost.mp3")
    this.load.audio("honk", "assets/honk.mp3")
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 40, // os tamanhos devem sempre corresponder ao tamanho do frame do objeto/personagem
      frameHeight: 29
    })
  }

  create () {
    //this.ost = this.sound.add("ost", { loop: true }).play();
    this.jensonbutton = this.add.sprite(225, 300, 'jensonbutton') // Comando de física (desnecessário p/ um botão)
    this.jensonbutton.setInteractive().on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
      this.jensonbutton.play('jensonbutton-pressing')
      this.honk = this.sound.add("honk", { loop: false}).play()
      if ('vibrate' in navigator) {
        navigator.vibrate(100)
      }
    })
  }

  update () { }
}