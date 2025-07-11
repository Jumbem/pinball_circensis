/*global Phaser*/
/*eslint no-undef: "error"*/
export default class jogar extends Phaser.Scene {
  constructor() {
    super("placar");
  }

  init() {
    this.game.cenaAtual = "placar";
  }

  preload() {
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("placar", "assets/png/backgrounds/placar.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("fim", "assets/png/buttons/fim.png", {
      frameWidth: 200,
      frameHeight: 50,
    });
  }

  create () {
    this.add.image(225, 400, "placar");

    this.voltar = this.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        if (window.game.mqttModo === "jogando") {
        const desistir = window.confirm("Você está no meio de uma partida. Tem certeza que quer desistir?");
        if (!desistir) {
          return
        } else {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop("placar");
            window.game.mqttClient.publish(
              window.game.mqttTopic + "modo", "espera", { qos: 1 }, () => {
                this.scene.start("abertura", { desistiu: true });
              });
          });
        };
      };
    });

    this.pontuacao = 0; // Inicializa a pontuação do jogador

        function podio(pontuacaoAtual) {
          let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
          if (ranking.length < 3) {
            return pontuacaoAtual > 0;
          }
          let menorPontuacao = Math.min(...ranking.map((item) => item.pontos));
          return pontuacaoAtual > menorPontuacao;
        }

        function novoRecorde(pontuacaoAtual) {
          let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
          let maiorPontuacao = 0;
          if (ranking.length > 0) {
            maiorPontuacao = ranking[0].pontos || 0; // Assume que o primeiro item é o de maior pontuação
          }
          return pontuacaoAtual > maiorPontuacao;
        }

    this.textoPontuacao = this.add
      .text(225, 450, `${this.pontuacao}`, {
        fontSize: "60px",
        fontStyle: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial",
        align: "center"
      })
      .setOrigin(0.5, 0.5);
    
            if (novoRecorde(this.pontuacao)) {
              this.textoPontuacao.setText(
                `${this.pontuacao}\n(Novo Recorde!)`
              )
            };

    this.fim = this.add
      .sprite(225, 625, "fim")
      .setInteractive()
      .on("pointerdown", () => {
        if (podio(this.pontuacao)) {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop("placar");
            window.game.mqttClient.publish(
              window.game.mqttTopic + "modo", "espera", { qos: 1 }, () => {
                this.scene.start("newhighscore", { pontuacao: this.pontuacao });
              }
            )
          });
        } else {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop("placar");
            //          alert("Obrigado por jogar!")
            window.game.mqttClient.publish(
              window.game.mqttTopic + "modo", "espera", { qos: 1 }, () => {
                this.scene.start("gameover");
            
              })
          });
        }
      })
  };

  update() {
    this.textoPontuacao.setText(this.game.placar);
  }
}
