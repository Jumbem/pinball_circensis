/*global Phaser*/
/*eslint no-undef: "error"*/
export default class abertura extends Phaser.Scene {

  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('abertura', 'assets/backgrounds/abertura.png')
    this.load.spritesheet('logo', 'assets/logo.png', {
      frameWidth: 315,
      frameHeight: 215
    })
    this.load.spritesheet('jogarbutton', 'assets/buttons/jogar.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('rankingbutton', 'assets/buttons/ranking.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('creditosbutton', 'assets/buttons/creditos.png', {
      frameWidth: 300,
      frameHeight: 75
    })
    this.load.spritesheet('highscorebutton', 'assets/buttons/highscore.png', {
      frameWidth: 300,
      frameHeight: 75
    })
  }

  create () {
    this.add.image(225, 400, 'abertura')

    this.anims.create({
      key: 'logo-lights',
      frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 15 }),
      frameRate: 4,
      repeat: -1
    })
    
    this.anims.create({
      key: 'jogarbutton-pressing',
      frames: this.anims.generateFrameNumbers('jogarbutton', { start: 0, end: 2 }),
      frameRate: 20
    });
    this.anims.create({
      key: 'rankingbutton-pressing',
      frames: this.anims.generateFrameNumbers('rankingbutton', { start: 0, end: 2}),
      frameRate: 20
    })
    this.anims.create({
      key: 'creditosbutton-pressing',
      frames: this.anims.generateFrameNumbers('creditosbutton', { start: 0, end: 2}),
      frameRate: 20
    })

    this.logo = this.add.sprite(225, 150, 'logo').setOrigin(0.5, 0.5);
    this.logo.anims.play('logo-lights', true);

    this.jogarbutton = this.add.sprite(225, 350, 'jogarbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.jogarbutton.anims.play('jogarbutton-pressing', true);
        this.jogarbutton.once('animationcomplete', () => {
          this.cameras.main.fadeOut(250);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.stop();
            this.scene.start('precarregamento')
          })
        })
      });

    this.rankingbutton = this.add.sprite(225, 450, 'rankingbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.rankingbutton.anims.play('rankingbutton-pressing', true);
        this.rankingbutton.once('animationcomplete', () => {
          this.cameras.main.fadeOut(250);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.stop();
            this.scene.start('ranking')
          })
        })
      })
    
    this.creditosbutton = this.add.sprite(225, 550, 'creditosbutton')
      .setInteractive()
      .on('pointerdown', () => {
        this.creditosbutton.anims.play('creditosbutton-pressing', true);
        this.creditosbutton.once('animationcomplete', () => { // Fade out the camera and switch to the 'creditos' scene
          this.cameras.main.fadeOut(250);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.stop();
            this.scene.start('creditos')
          })
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
