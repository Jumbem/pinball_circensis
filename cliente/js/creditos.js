export default class creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  init() {
    this.game.cenaAtual = "creditos";
  }

  preload() {
    this.load.audio("cantarolando", "assets/ost/cantarolando.mp3");
    this.load.audio("botao", "assets/sfx/botao.mp3");
    this.load.image("creditos", "assets/backgrounds/creditos.png");
    this.load.spritesheet("voltar", "assets/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('bianca', 'assets/sona-bianca-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
    this.load.spritesheet('junior', 'assets/sona-junior-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
  }

  create() {
    this.cantarolando = this.sound.add("cantarolando", { loop: true });
    this.cantarolando.play();

    this.add.image(225, 400, "creditos");

    this.voltar = this.physics.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.cantarolando.stop(); // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('creditos')
          this.scene.start('abertura')
        })
      })
    
    this.add.sprite(100, 200, 'bianca').setScale(0.5).play('bianca');
    this.add.text(225, 200, 'BIANCA', {
      fontFamily: 'Arial',
      fontSize: '50px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
    this.add.text(170, 150, 'Desenvolvedora', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff'
    });

    this.add.sprite(300, 600, 'junior').setScale(0.5).play('junior');
    this.add.text(225, 600, 'JUNIOR', {
      fontFamily: 'Arial',
      fontSize: '50px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
    this.add.text(250, 550, 'Programador (web app), artista geral', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff'
    });

    this.add.text(100, 650, 'Professores/Orientadores:', {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
    this.add.text(75, 675, 'Clayrton M. Henrique\nEderson Torresini, "Boi"', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
  }

  update() {}
}
