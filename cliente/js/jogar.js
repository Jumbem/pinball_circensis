/*global Phaser, io*/
/*eslint no-undef: "error"*/
export default class jogar extends Phaser.Scene {

  constructor () {
    super('jogar')
  }

  init () { }

  preload () {
    //this.load.audio("ost", "assets/ost.mp3")
    this.load.audio("honk", "assets/honk.mp3")
    this.load.image("jogar", "assets/jogar.png")
    this.load.spritesheet('voltar', 'assets/voltar.png', {
      frameWidth: 100,
      frameHeight: 100
    })
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 64, // os tamanhos devem sempre corresponder ao tamanho do frame do objeto/personagem
      frameHeight: 40
    })
  }

  create () {
    this.add.image(225, 400, 'jogar')
    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
        this.scene.stop('jogar')
        this.scene.start('abertura')
      })

    this.jensonbutton = this.physics.add
      .sprite(225, 400, 'jensonbutton')
      .setInteractive()
      .on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
        this.jensonbutton.play('jensonbutton-pressing')
        this.honk = this.sound.add("honk", { loop: false }).play()
        if ('vibrate' in navigator) {
          navigator.vibrate(100)
        }
      })
  }

  update () { }
}