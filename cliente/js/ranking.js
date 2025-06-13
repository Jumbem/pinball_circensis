export default class ranking extends Phaser.Scene {

  constructor () {
    super('ranking')
  }

  init (data) {
    this.nome = data.nome;
  }

  preload () {
    this.load.image('ranking', 'assets/ranking.png')
    this.load.spritesheet('voltar', 'assets/button-voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.add.image(225, 400, 'ranking')

    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => { // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('ranking')
          this.scene.start('abertura')
        })
      })

  this.add.text(255, 100, `Nome: ${this.nome}`, {
    fontSize: '32px',
    color: '#FFFFFF',
    fontFamily: 'Arial'
  }).setOrigin(0.5, 0.5);

  }

  update () { }
}
