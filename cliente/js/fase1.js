export default class fase1 extends Phaser.Scene {

  constructor () {
    super('fase1')
  }

  init () { }

  preload () { 
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 40,
      frameHeight: 29
    })
  }

  create () {
    this.jensonbutton = this.physics.add.sprite(500, 400, 'jensonbutton')
    this.jensonbutton
      .setInteractive()
      .on('pointerdown', () => {
        this.jensonbutton.play('jensonbutton-press')
      })

    this.anims.create({
      key: 'jensonbutton-press',
      frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2}),
      frameRate: 60
    })

    this.jensonbutton.play('jensonbutton-pressed')
  }

  update () { }
}