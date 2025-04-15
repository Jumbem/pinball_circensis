export default class fase1 extends Phaser.Scene {

  constructor () {
    super('fase1')
  }

  init () { }

  preload () { 
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 20,
      frameHeight: 14
    })
  }

  create () { 
    this.jensonbutton = this.physics.add.sprite(100, 100, 'jensonbutton')

    this.anims.create({
      key: 'jensonbutton-pressed',
      frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    })

    this.jensonbutton.play('jensonbutton-pressed')
  }

  update () { }
}