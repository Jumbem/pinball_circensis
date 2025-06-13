export default class newhighscore extends Phaser.Scene {

  constructor () {
    super('newhighscore')
  }

  init () { }

  preload () {
    this.load.image('newhighscore', 'assets/newhighscore.png')
    this.load.spritesheet('voltar', 'assets/button-voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('alphabet', 'assets/juniors-alphabet-light.png', {
      frameWidth: 100,
      frameHeight: 110
    })
    this.load.spritesheet('upbutton', 'assets/button-up.png', {
      frameWidth: 92,
      frameHeight: 104
    })
    this.load.spritesheet('downbutton', 'assets/button-down.png', {
      frameWidth: 92,
      frameHeight: 104
    })
    this.load.spritesheet('confirmar', 'assets/button-confirmar.png', {
      frameWidth: 200,
      frameHeight: 50
    })
  }

  create () {
    this.add.image(225, 400, 'newhighscore')

    this.voltar = this.physics.add
      .sprite(50, 50, 'voltar')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {// a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('newhighscore')
          this.scene.start('abertura')
        })
      })

    this.letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    this.indices = [0, 0, 0];

    this.textos = [];

    const baseX = 125;
    const espacamento = 100;

    for (let i = 0; i < 3; i++) {
      const x = baseX + i * espacamento;
      const textoLetra = this.add.text(x, 487, this.letras[this.indices[i]], {
        fontSize: '100px',
        color: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5, 0.5);
      this.textos.push(textoLetra);
    
      this.anims.create({
        key: 'upbutton-move',
        frames: this.anims.generateFrameNumbers('upbutton', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      })
      this.anims.create({
        key: 'downbutton-move',
        frames: this.anims.generateFrameNumbers('downbutton', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      })

      //    const totalFrames = this.textures.get('alphabet').frameTotal - 1;
      //    this.alphabet.setFrame(0); // Inicia com o primeiro frame

      this.upbutton = this.physics.add
        .sprite(125, 380, 'upbutton')
        .play('upbutton-move')
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.indices[i] = (this.indices[i] - 1 + this.letras.length) % this.letras.length;
          this.textos[i].setText(this.letras[this.indices[i]]);
        })
    
      this.downbutton = this.physics.add
        .sprite(125, 600, 'downbutton')
        .play('downbutton-move')
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.indices[i] = (this.indices[i] + 1) % this.letras.length;
          this.textos[i].setText(this.letras[this.indices[i]]);
        })
    }
    
    this.confirmar = this.add.sprite(225, 700, 'confirmar')
      .setInteractive()
      .on('pointerdown', () => {
        const textos = this.indices.map(i => this.letras[i]).join('');
        this.cameras.main.fadeOut(650)
        this.cameras.main.once('camerafadeoutcomplete', () => { // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('newhighscore')
          this.scene.start('ranking')
        })
    })
  }      
  
  update () { }

}