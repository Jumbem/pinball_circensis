export default class newhighscore extends Phaser.Scene {

  constructor () {
    super('newhighscore')
  }

  init () { }

  preload () {
    this.load.image('newhighscore', 'assets/newhighscore.png')
  }

  create () {
    this.add.image(225, 400, 'newhighscore')
  }

  update () { }
}