/*global Phaser*/
/*eslint no-undef: "error"*/
export default class abertura extends Phaser.Scene {

  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('bg', 'assets/abertura-bg.png')
    this.load.spritesheet('logo', 'assets/logo.png', {
      frameWidth: 400,
      frameHeight: 300
    })
    this.load.spritesheet('jogarbutton', 'assets/jogarbutton.png', {
      frameWidth: 200,
      frameHeight: 50
    })
    this.load.spritesheet('rankingbutton', 'assets/rankingbutton.png', {
      frameWidth: 200,
      frameHeight: 50
    })
    this.load.spritesheet('creditosbutton', 'assets/creditosbutton.png', {
      frameWidth: 200,
      frameHeight: 50
    })
    this.load.spritesheet('highscorebutton', 'assets/highscorebutton.png', {
      frameWidth: 200,
      frameHeight: 50
    })
  }

  create () {
    this.add.image(225, 400, 'bg')

    this.anims.create({
      key: 'logo-lights',
      frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 13 }),
      frameRate: 5,
      repeat: -1
    })
    this.logo = this.add.sprite(225, 150, 'logo').setOrigin(0.5, 0.5);
    this.logo.anims.play('logo-lights', true);

    this.jogarbutton = this.add.sprite(225, 400, 'jogarbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('precarregamento')
        })
      });

    this.rankingbutton = this.add.sprite(225, 500, 'rankingbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('ranking');
        })
      })
    
    this.creditosbutton = this.add.sprite(225, 600, 'creditosbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('creditos')
        })
      })
    
  }
}
