export default class creditos extends Phaser.Scene {

  constructor () {
    super('creditos')
  }

  init () { }

  preload () {
    this.load.image('creditos', 'assets/creditos.png')
    this.load.spritesheet('voltar', 'assets/voltar.png', {
      frameWidth: 100,
      frameHeight: 100
    })
  }

  create () {
    this.add.image(225, 400, 'creditos')
    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
        this.scene.stop('jogar')
        this.scene.start('abertura')
      })
  }

  update () { }
}
