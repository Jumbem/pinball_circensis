export default class creditos extends Phaser.Scene {

  constructor () {
    super('creditos')
  }

  init () { }

  preload () {
    this.load.image('creditos', 'assets/backgrounds/creditos.png')
    this.load.spritesheet('voltar', 'assets/buttons/voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.add.image(225, 400, 'creditos')
    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {// a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('creditos')
          this.scene.start('abertura')
        })
      })
  }

  update () { }
}
