/*global Phaser*/
/*eslint no-undef: "error"*/
export default class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init() {
    this.game.cenaAtual = "gameover";
  }

  preload() {
    this.load.audio("gameover", "assets/mp3/ost/gameover.mp3");
    this.load.image("gameover", "assets/png/backgrounds/gameover.png");
  }

  create() {
    this.gameoverSound = this.sound.add("gameover", { loop: false });
    this.gameoverSound.play();
    this.add.image(225, 400, "gameover");

    this.add.text(225, 350, "FIM DE\nJOGO!", {
      fontFamily: "Arial",
      fontSize: "100px",
      fontStyle: "bold",
      color: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 2,
    }).setOrigin(0.5, 0.5);
    this.add.text(225, 525, "Que tal jogar\nmais uma vez para\nmelhorar sua pontuação?", {
      fontFamily: "Arial",
      fontSize: "30px",
      color: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 2,
    }).setOrigin(0.5, 0.5);

    this.time.delayedCall(5000, () => {
      this.cameras.main.fadeOut(250);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.stop();
        this.scene.start("abertura");
      });
    });
  }

  update() {}
}
