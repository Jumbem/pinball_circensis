export default class jogar extends Phaser.Scene {
  constructor() {
    super("jogar");
  }

  init() {
    this.game.cenaAtual = "jogar";
  }

  preload () {
    this.load.audio("cantarolando", "assets/mp3/ost/cantarolando.mp3");
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("jogar", "assets/png/backgrounds/jogar.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("upbutton", "assets/png/buttons/up.png", {
      frameWidth: 92,
      frameHeight: 104,
    });
    this.load.spritesheet("downbutton", "assets/png/buttons/down.png", {
      frameWidth: 92,
      frameHeight: 104,
    });
    this.load.spritesheet("confirmar", "assets/png/buttons/confirmar.png", {
      frameWidth: 200,
      frameHeight: 50,
    });
  }

  create() {
    this.add.image(225, 400, "jogar");

    this.cantarolando = this.sound.add("cantarolando", { loop: true });
    this.cantarolando.play();

//    window.game.mqttClient.on("message", (topic, message) => {
//      console.log("Mensagem recebida:", topic, message.toString()); // debug geral
//      if (topic === window.game.mqttTopic + "senha") {
//        window.game.mqttSenha = message.toString();
//        console.log("Senha:", window.game.mqttSenha); // debug
//      }
//    });

    this.voltar = this.physics.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => { // a interatividade só acontece ao clicar/tocar no botão
          this.cantarolando.stop();
          this.scene.stop("jogar");
          this.scene.start("abertura");
        });
      });

    this.add.text(225, 210, "Para iniciar o jogo,\npor favor insira a senha\ndita pelo operador", {
      fontFamily: "Arial",
      fontSize: "33px",
      color: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 2,
    }).setOrigin(0.5, 0.5);

    this.anims.create({
      key: "upbutton-move",
      frames: this.anims.generateFrameNumbers("upbutton", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "downbutton-move",
      frames: this.anims.generateFrameNumbers("downbutton", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.numeros = "0123456789".split("");
    this.indices = [0, 0, 0, 0];
    this.senha = [];

    const baseX = 75;
    const espacamento = 100;

    for (let i = 0; i < 4; i++) {
      const x = baseX + i * espacamento;
      const textoSenha = this.add
        .text(x, 438, this.numeros[this.indices[i]], {
          fontSize: "125px",
          color: "#FFFFFF",
          fontFamily: "Arial",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);
      this.senha.push(textoSenha);

      let upInterval;
      this.upbutton = this.add.sprite(x, 330, "upbutton")
        .play("upbutton-move")
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.indices[i] =
            (this.indices[i] - 1 + this.numeros.length) % this.numeros.length;
          this.senha[i].setText(this.numeros[this.indices[i]]);
          upInterval = setInterval(() => {
            this.indices[i] =
              (this.indices[i] - 1 + this.numeros.length) % this.numeros.length;
            this.senha[i].setText(this.numeros[this.indices[i]]);
          }, 100);
        })
        .on("pointerup", () => clearInterval(upInterval))
        .on("pointerout", () => clearInterval(upInterval));

      let downInterval;
      this.downbutton = this.add.sprite(x, 550, "downbutton")
        .play("downbutton-move")
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.indices[i] = (this.indices[i] + 1) % this.numeros.length;
          this.senha[i].setText(this.numeros[this.indices[i]]);
          downInterval = setInterval(() => {
            this.indices[i] = (this.indices[i] + 1) % this.numeros.length;
            this.senha[i].setText(this.numeros[this.indices[i]]);
          }, 100);
        })
        .on("pointerup", () => clearInterval(downInterval))
        .on("pointerout", () => clearInterval(downInterval));
    }

    this.confirmar = this.add.sprite(225, 660, "confirmar")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        const senhaDigitada = this.indices.map(i => this.numeros[i]).join("");
        if (senhaDigitada === window.game.mqttSenha) {
          window.game.mqttClient.publish(
            window.game.mqttTopic + "modo", "jogando", { qos: 1 }
          )
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.cantarolando.stop();
            this.scene.stop("jogar");
            this.scene.start("placar");
          });
        } else {
          alert("Senha incorreta! Tente novamente.");
        }
      });
    
  }
}