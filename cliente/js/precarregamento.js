/*global Phaser*/
/*eslint no-undef: "error"*/
export default class precarregamento extends Phaser.Scene {
  constructor() {
    super("precarregamento");
  }

  init() {
    this.game.cenaAtual = "precarregamento";

    this.add.rectangle(225, 400, 425, 32).setStrokeStyle(1, 0xffffff);

    // Corrigido: começa logo dentro da moldura (com 1px de margem à esquerda)
    const progresso = this.add
      .rectangle(225 - 425 / 2 + 1, 400, 6, 24, 0xffffff)
      .setOrigin(0, 0.5);

    this.load.on("progress", (progress) => {
      progresso.width = 2 + 421 * progress; // 425 - 4 de margem total
    });
  }

  preload() {
    this.load.setPath("assets/");
    //this.load.image("bg", "abertura-bg.png");
    //this.load.spritesheet("jensonbutton", "jensonbutton.png", {
    //  frameWidth: 40,
    //  frameHeight: 29,
    //});
  }

  create() {
    this.scene.start("jogar");
  }
}
