export default class newhighscore extends Phaser.Scene {

  constructor () {
    super('newhighscore')
  }

  init () { }

  preload () {
    this.load.image('newhighscore', 'assets/newhighscore.png')
    this.load.spritesheet('voltar', 'assets/voltar.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('alphabet', 'assets/juniors-alphabet-light.png', {
      frameWidth: 100,
      frameHeight: 110
    })
    this.load.spritesheet('upbutton', 'assets/upbutton.png', {
      frameWidth: 92,
      frameHeight: 104
    })
    this.load.spritesheet('downbutton', 'assets/downbutton.png', {
      frameWidth: 92,
      frameHeight: 104
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

    this.alphabet = this.add.sprite(125, 490, 'alphabet', 0)

    const totalFrames = this.textures.get('alphabet').frameTotal - 1;
    this.alphabet.setFrame(0); // Inicia com o primeiro frame

    this.upbutton = this.physics.add
      .sprite(125, 380, 'upbutton')
      .play('upbutton-move')
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        let nextFrame = (this.alphabet.frame.name - 1 + totalFrames) % totalFrames
        if (nextFrame === 0) {
          nextFrame = totalFrames - 1; // Se for o primeiro frame, vai para o último
        }
        this.alphabet.setFrame(nextFrame)
      })
    
    this.downbutton = this.physics.add
      .sprite(125, 600, 'downbutton')
      .play('downbutton-move')
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        let prevFrame = (this.alphabet.frame.name + 1) % totalFrames
        this.alphabet.setFrame(prevFrame)
      }
    )
  }      
  
  update () { }
}