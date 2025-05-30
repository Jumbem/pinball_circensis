export default class abertura extends Phaser.Scene {

  constructor () {
    super('abertura')
  }

  init() { }
    
  preload() {
      this.load.image('bg', 'assets/abertura-bg.png')
      this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
        frameWidth: 64,
        frameHeight: 40
      })
    }

  create () {
    this.add.image(225, 400, 'bg')
    this.anims.create({
      key: 'jensonbutton-pressing',
      frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
      frameRate: 60
    })
    this.jensonbutton = this.physics.add
      .sprite(225, 400, 'jensonbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.jensonbutton.anims.play('jensonbutton-pressing', true);
      });
    
    this.jensonbutton.on('animationcomplete', () => {
      this.scene.stop();
      this.scene.start('precarregamento');
    });
  }

  update () { }
  
}