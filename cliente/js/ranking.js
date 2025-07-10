/*global Phaser*/
/*eslint no-undef: "error"*/
export default class ranking extends Phaser.Scene {
  constructor() {
    super("ranking");
  }

  init(data) {
    this.nome = data.nome;
    this.pontuacao = data.pontuacao;
    this.game.cenaAtual = "ranking";
  }

  preload() {
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.audio("tiroEqueda", "assets/mp3/ost/tiro-e-queda.mp3");
    this.load.image("ranking", "assets/png/backgrounds/ranking.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.tiroEqueda = this.sound.add("tiroEqueda", { loop: true });
    this.tiroEqueda.play();

    this.add.image(225, 400, "ranking");

    this.voltar = this.physics.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.tiroEqueda.stop();
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop("ranking");
          this.scene.start("abertura");
        });
      });

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    const posicoes = [
      { x: 228, y: 230 }, // P1
      { x: 90, y: 290 }, // P2
      { x: 370, y: 330 }, // P3
    ];

    const offsetPontuacao = [235, 175, 138];

    ranking.forEach((item, i) => {
      if (i < 3) {
        this.add
          .text(posicoes[i].x, posicoes[i].y, `${item.nome}`, {
            fontSize: "45px",
            color: "#FFFFFF",
            fontFamily: "Arial",
            fontStyle: "bold",
            align: "center", // 'left', 'center' ou 'right'
          })
          .setOrigin(0.5, 0.5);

        this.add
          .text(
            posicoes[i].x,
            posicoes[i].y + offsetPontuacao[i],
            `${item.pontos}`,
            {
              fontSize: "25px",
              color: "#FFFFFF",
              fontFamily: "Arial",
              fontStyle: "bold", // 'normal', 'bold', 'italic' ou 'bold italic'
              align: "center",
            }
          )
          .setOrigin(0.5, 0.5);
      }
    });

    this.add.text(70, 600, "Sua maior pontuação:", {
      fontSize: "32px",
      color: "#FFFFFF",
      fontFamily: "Arial",
      align: "center",
    });
  }

  update() {}
}
