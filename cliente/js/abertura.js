/*global Phaser*/
/*eslint no-undef: "error"*/
export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  init() {
    this.game.cenaAtual = "abertura";
  }

  preload() {
    this.load.audio("charliechaplin", "assets/mp3/ost/charlie-chaplin-walk.mp3");
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("abertura", "assets/png/backgrounds/abertura2.png");
    this.load.spritesheet("logo", "assets/png/other/logo.png", {
      frameWidth: 315,
      frameHeight: 215,
    });
    this.load.spritesheet("jogarbutton", "assets/png/buttons/jogar.png", {
      frameWidth: 300,
      frameHeight: 75,
    });
    this.load.spritesheet("rankingbutton", "assets/png/buttons/ranking.png", {
      frameWidth: 300,
      frameHeight: 75,
    });
    this.load.spritesheet("creditosbutton", "assets/png/buttons/creditos.png", {
      frameWidth: 300,
      frameHeight: 75,
    });
    this.load.spritesheet("highscorebutton", "assets/png/buttons/highscore.png", {
      frameWidth: 300,
      frameHeight: 75,
    });
  }

  create() {
    this.charliechaplin = this.sound.add("charliechaplin", { loop: true });
    this.charliechaplin.play();
    this.add.image(225, 400, "abertura");

    this.anims.create({
      key: "logo-lights",
      frames: this.anims.generateFrameNumbers("logo", { start: 0, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jogarbutton-pressing",
      frames: this.anims.generateFrameNumbers("jogarbutton", {
        start: 0,
        end: 2,
      }),
      frameRate: 20,
    });
    this.anims.create({
      key: "rankingbutton-pressing",
      frames: this.anims.generateFrameNumbers("rankingbutton", {
        start: 0,
        end: 2,
      }),
      frameRate: 20,
    });
    this.anims.create({
      key: "creditosbutton-pressing",
      frames: this.anims.generateFrameNumbers("creditosbutton", {
        start: 0,
        end: 2,
      }),
      frameRate: 20,
    });

    this.logo = this.add.sprite(225, 150, "logo").setOrigin(0.5, 0.5);
    this.logo.anims.play("logo-lights", true);

    window.game.mqttClient.on("message", (topic, message) => {
      if (topic === window.game.mqttTopic + "modo") {
        window.game.mqttModo = message.toString();
      }
    });

    window.game.mqttModo = "espera";

    this.jogarbutton = this.add
      .sprite(225, 350, "jogarbutton")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        if (window.game.mqttModo === "jogando") {
          alert("Outro usuário já está jogando. Aguarde a sua vez!");
          return;
        }
        this.jogarbutton.anims.play("jogarbutton-pressing", true);
        this.jogarbutton.once("animationcomplete", () => {
          this.cameras.main.fadeOut(250);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.charliechaplin.stop();
            this.scene.stop();
            this.scene.start("precarregamento");
          });
        });
      });

    this.rankingbutton = this.add
      .sprite(225, 450, "rankingbutton")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        if (ranking.length < 3) {
          alert(
            "O ranking só estará disponível após três jogadores diferentes registrarem seus primeiros pontos. Venha jogar você também!"
          );
          return;
        } else {
          this.rankingbutton.anims.play("rankingbutton-pressing", true);
          this.rankingbutton.once("animationcomplete", () => {
            this.cameras.main.fadeOut(250);
            this.cameras.main.once("camerafadeoutcomplete", () => {
              this.charliechaplin.stop();
              this.scene.stop();
              this.scene.start("ranking");
            });
          });
        }
      });

    this.creditosbutton = this.add
      .sprite(225, 550, "creditosbutton")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.creditosbutton.anims.play("creditosbutton-pressing", true);
        this.creditosbutton.once("animationcomplete", () => {
          this.cameras.main.fadeOut(250);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.charliechaplin.stop();
            this.scene.stop();
            this.scene.start("creditos");
          });
        });
      });
  }
}
