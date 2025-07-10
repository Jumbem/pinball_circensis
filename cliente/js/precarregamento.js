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
    this.load.audio(
      "charliechaplin",
      "assets/mp3/ost/charlie-chaplin-walk.mp3"
    );
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
    this.load.spritesheet(
      "highscorebutton",
      "assets/png/buttons/highscore.png",
      {
        frameWidth: 300,
        frameHeight: 75,
      }
    );
    this.load.audio("hyperfun", "assets/mp3/ost/hyperfun.mp3");
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("creditos", "assets/png/backgrounds/abertura2.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      "sona-bianca",
      "assets/png/other/sona-bianca-300.png",
      {
        frameWidth: 300,
        frameHeight: 300,
      }
    );
    this.load.spritesheet(
      "sona-junior",
      "assets/png/other/sona-junior-300.png",
      {
        frameWidth: 300,
        frameHeight: 300,
      }
    );
    this.load.spritesheet("bianca", "assets/png/other/bianca.png", {
      frameWidth: 325,
      frameHeight: 99,
    });
    this.load.spritesheet("junior", "assets/png/other/junior.png", {
      frameWidth: 325,
      frameHeight: 99,
    });
    this.load.audio("gameover", "assets/mp3/ost/gameover.mp3");
    this.load.image("gameover", "assets/png/backgrounds/gameover.png");
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
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.audio("tiroEqueda", "assets/mp3/ost/tiro-e-queda.mp3");
    this.load.image("ranking", "assets/png/backgrounds/ranking.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("soNasPretas", "assets/mp3/ost/so-nas-pretas.mp3");
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("newhighscore", "assets/png/backgrounds/newhighscore.png");
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
    this.scene.start("jogar");
  }
}
