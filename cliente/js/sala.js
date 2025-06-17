export default class sala extends Phaser.Scene {
  constructor() {
    super("sala");
  }

  init() {
    this.game.cenaAtual = "sala";
  }

  preload() {}

  create() {
    this.salas = [
      { x: 225, y: 160, numero: "1" },
      { x: 225, y: 320, numero: "2" },
      { x: 225, y: 480, numero: "3" },
      { x: 225, y: 640, numero: "4" },
    ];

    this.salas.forEach((sala) => {
      sala.botao = this.add
        .text(sala.x, sala.y, sala.numero)
        .setInteractive()
        .on("pointerdown", () => {
          this.game.sala = sala.numero;
          this.game.socket.emit("entrar-na-sala", this.game.sala);
        });
    });

    this.game.socket.on("jogadores", (jogadores) => {
      if (jogadores.segundo) {
        this.scene.stop();
        this.scene.start("jogar");
      }
    });
  }

  update() {}
}
