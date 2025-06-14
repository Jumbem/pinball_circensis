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
    this.load.image("jogar", "assets/backgrounds/jogar.png")
    this.load.spritesheet('voltar', 'assets/buttons/voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 200,
      frameHeight: 145
    })
  }

  create () {
    this.add.image(225, 400, 'jogar')
    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {// a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('jogar')
          this.scene.start('abertura')
        })
      })
    
    this.anims.create({
      key: 'jensonbutton-pressing',
      frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
      frameRate: 60
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