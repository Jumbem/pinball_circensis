export default class precarregamento extends Phaser.Scene {

  constructor () {
    super('precarregamento')
  }

  init () {
    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff)
    const progresso = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff)
    this.load.on('progress', (progress) => {
      progresso.width = 4 + (460 * progress)
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
