/*global Phaser*/
/*eslint no-undef: "error"*/
export default class abertura extends Phaser.Scene {

  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('bg', 'assets/abertura-bg.png')
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 64,
      frameHeight: 40
    })
    this.load.spritesheet('logo', 'assets/logo.png', {
      frameWidth: 400,
      frameHeight: 300
    })
  }

  create () {
    this.add.image(225, 400, 'bg')

    this.anims.create({
      key: 'jensonbutton-pressing',
      frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
      frameRate: 60
    })
    this.anims.create({
      key: 'logo-lights',
      frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 13 }),
      frameRate: 5,
      repeat: -1
    })

    this.logo = this.add.sprite(225, 150, 'logo').setOrigin(0.5, 0.5);
    this.logo.anims.play('logo-lights', true);

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

}