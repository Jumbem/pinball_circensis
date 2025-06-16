export default class creditos extends Phaser.Scene {

  constructor () {
    super('creditos')
  }

  init () { }

  preload () {
    this.load.audio('cantarolando', 'assets/ost/cantarolando.mp3')
    this.load.audio('botao', 'assets/sfx/botao.mp3')
    this.load.image('creditos', 'assets/backgrounds/creditos.png')
    this.load.spritesheet('voltar', 'assets/buttons/voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.cantarolando = this.sound.add('cantarolando', { loop: true });
    this.cantarolando.play();

    this.add.image(225, 400, 'creditos')
    
    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('botao', { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.cantarolando.stop(); // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('creditos')
          this.scene.start('abertura')
        })
      })
  }

  update () { }
}
