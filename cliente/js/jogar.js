export default class jogar extends Phaser.Scene {
  constructor() {
    super("jogar");
  }

  init() {
    this.game.cenaAtual = "jogar";
  }

  preload() {
    this.load.audio("botao", "assets/sfx/botao.mp3");
//    this.load.image("senha", "assets/backgrounds/senha.png");
    this.load.spritesheet("voltar", "assets/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
//    this.add.image(225, 400, "senha");

    this.voltar = this.physics.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => { // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop("jogar");
          this.scene.start("abertura");
        });
      });
  }
}