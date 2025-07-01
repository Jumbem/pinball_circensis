/*global Phaser, io*/
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
    //this.load.audio("honk", "assets/honk.mp3");
    this.load.image("placar", "assets/png/backgrounds/placeholder.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    //this.load.spritesheet("jensonbutton", "assets/png/buttons/jensonbutton.png", {
    //  frameWidth: 300,
    //  frameHeight: 75,
    //});
    this.load.spritesheet("fim", "assets/png/buttons/fim.png", {
      frameWidth: 200,
      frameHeight: 50,
    });
  }

  create() {
    this.add.image(225, 400, "placar");

    this.voltar = this.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop("placar");
          this.scene.start("abertura");
        });
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
      .text(125, 600, `Pontuação: ${this.pontuacao}`, {
        fontSize: "32px",
        color: "#AAAAAA",
        fontFamily: "Arial",
        align: "center",
      })
      .setOrigin(0, 0.5);

    //this.jensonbutton = this.add
    //  .sprite(225, 450, "jensonbutton")
    //  .setInteractive()
    //  .on("pointerdown", () => {
    //    this.honk = this.sound.add("honk", { loop: false }).play();
    //    this.pontuacao += 1;
    //    this.textoPontuacao.setText(`Pontuação: ${this.pontuacao}`);
    //    if ("vibrate" in navigator) {
    //      navigator.vibrate(100);
    //    }
        if (novoRecorde(this.pontuacao)) {
          this.textoPontuacao.setText(
            `Pontuação: ${this.pontuacao}\n(Novo Recorde!)`
    //      );
          )
      };

    this.fim = this.add
      .sprite(225, 700, "fim")
      .setInteractive()
      .on("pointerdown", () => {
        if (podio(this.pontuacao)) {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop("jogar");
            this.scene.start("newhighscore", { pontuacao: this.pontuacao });
          });
        } else {
          this.cameras.main.fadeOut(187);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop("jogar");
            this.scene.start("abertura");
          });
        }
      });
  }

  update() {
    this.textoPontuacao.setText(this.game.placar);
  }
}
