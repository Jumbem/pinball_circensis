/*global Phaser*/
/*eslint no-undef: "error"*/
export default class abertura extends Phaser.Scene {

  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('abertura', 'assets/abertura.png')
    this.load.spritesheet('logo', 'assets/logo.png', {
      frameWidth: 400,
      frameHeight: 300
    })
    this.load.spritesheet('jogarbutton', 'assets/jogarbutton.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('rankingbutton', 'assets/rankingbutton.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('creditosbutton', 'assets/creditosbutton.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('highscorebutton', 'assets/highscorebutton.png', {
      frameWidth: 300,
      frameHeight: 75
    })
  }

  create () {
    this.add.image(225, 400, 'abertura')

    this.anims.create({
      key: 'logo-lights',
      frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 13 }),
      frameRate: 5,
      repeat: -1
    })
    this.logo = this.add.sprite(225, 150, 'logo').setOrigin(0.5, 0.5);
    this.logo.anims.play('logo-lights', true);

    this.jogarbutton = this.add.sprite(225, 350, 'jogarbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('precarregamento')
        })
      });

    this.rankingbutton = this.add.sprite(225, 450, 'rankingbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('ranking');
        })
      })
    
    this.creditosbutton = this.add.sprite(225, 550, 'creditosbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('creditos')
        })
      })
    
    this.highscorebutton = this.add.sprite(225, 700, 'highscorebutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(187);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('newhighscore')
        })
      })
    
  }
}
