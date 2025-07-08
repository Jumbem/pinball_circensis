export default class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init() {
    this.game.cenaAtual = "gameover";
  }

  preload () {
    this.load.audio("gameover", "assets/mp3/ost/gameover.mp3");
    this.load.image("gameover", "assets/png/backgrounds/gameover.png");
  }

  create () {
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
    this.add.text(225, 525, "Que tal jogar\nmais uma vez para\nentrar no TOP 3?", {
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
    
    //this.salas = [
    //  { x: 225, y: 160, numero: "1" },
    //  { x: 225, y: 320, numero: "2" },
    //  { x: 225, y: 480, numero: "3" },
    //  { x: 225, y: 640, numero: "4" },
    //];

    //this.salas.forEach((sala) => {
    //  sala.botao = this.add
    //    .text(sala.x, sala.y, sala.numero)
    //    .setInteractive()
    //    .on("pointerdown", () => {
    //      this.game.sala = sala.numero;
    //      this.game.socket.emit("entrar-na-sala", this.game.sala);
    //    });
    //});

    //this.game.socket.on("jogadores", (jogadores) => {
    //  if (jogadores.segundo) {
    //    this.scene.stop();
    //    this.scene.start("jogar");
    //  }
    //});
  }

  update() {}
}
