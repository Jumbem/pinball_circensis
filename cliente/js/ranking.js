export default class ranking extends Phaser.Scene {

  constructor () {
    super('ranking')
  }

  init (data) {
    this.nome = data.nome;
    this.pontuacao = data.pontuacao;
  }

  preload () {
    this.load.image('ranking', 'assets/backgrounds/ranking.png')
    this.load.spritesheet('voltar', 'assets/buttons/voltar.png', {
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

    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.forEach((item, i) => {
      this.add.text(225, 225, `${item.nome}`, {
        fontSize: '60px',
        color: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center' // 'left', 'center' ou 'right'
      }).setOrigin(0.5, 0.5);
    
      this.add.text(225, 465, `${item.pontos}`, {
        fontSize: '25px',
        color: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold', // 'normal', 'bold', 'italic' ou 'bold italic'
        align: 'center'
      }).setOrigin(0.5, 0.5);
    })

    this.add.text(70, 600, 'Sua maior pontuação:', {
      fontSize: '32px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      align: 'center'
    })

  }

  update () { }
}
