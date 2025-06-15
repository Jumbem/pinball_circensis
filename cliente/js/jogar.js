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
    this.load.spritesheet('jensonbutton', 'assets/buttons/jensonbutton.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('fim', 'assets/buttons/fim.png', {
      frameWidth: 200,
      frameHeight: 50
    })
  }

  create () {
    this.add.image(225, 400, 'jogar')
    this.voltar = this.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {// a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('jogar')
          this.scene.start('abertura')
        })
      })
    
    this.pontuacao = 0; // Inicializa a pontuação do jogador
    
    let ranking = JSON.parse(localStorage.getItem('ranking')) || []; // Recupera o ranking do localStorage ou inicializa como vazio
    // Verifica se é um novo recorde
    const novoRecorde = (
      ranking.length < 3 ||
      this.pontuacao > Math.min(...ranking.map(r => r.pontos))
    )

    this.textoPontuacao = this.add.text(125, 600, `Pontuação: ${this.pontuacao}`, {
      fontSize: '32px',
      color: '#AAAAAA',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0, 0.5)
    
    this.jensonbutton = this.add
      .sprite(225, 450, 'jensonbutton')
      .setInteractive()
      .on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
        this.honk = this.sound.add("honk", { loop: false }).play()
        this.pontuacao += 1
        this.textoPontuacao.setText(`Pontuação: ${this.pontuacao}`)
        if ('vibrate' in navigator) {
          navigator.vibrate(100)
        }
        if (novoRecorde && this.pontuacao > 0) {
          this.textoPontuacao.setText(`Pontuação: ${this.pontuacao}\n(Novo Recorde!)`)
        }
      })
    
    this.fim = this.add
      .sprite(225, 700, 'fim')
      .setInteractive()
      .on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        const novoRecorde = (
          ranking.length < 3 ||
          this.pontuacao > Math.min(...ranking.map(r => r.pontos))
        )
        if (novoRecorde && this.pontuacao > 0) {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.stop('jogar')
            this.scene.start('newhighscore', { pontuacao: this.pontuacao })
          })
        } else {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once('camerafadeoutcomplete', () => { // a interatividade só acontece ao clicar/tocar no botão
            this.scene.stop('jogar')
            this.scene.start('abertura')
          })
        }
      })
  }

  update () { }
}