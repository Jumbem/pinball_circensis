export default class creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  init() {
    this.game.cenaAtual = "creditos";
  }

  preload() {
    this.load.audio("hyperfun", "assets/mp3/ost/hyperfun.mp3");
    this.load.audio("botao", "assets/mp3/sfx/botao.mp3");
    this.load.image("creditos", "assets/png/backgrounds/abertura2.png");
    this.load.spritesheet("voltar", "assets/png/buttons/voltar.png", {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('sona-bianca', 'assets/png/other/sona-bianca-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
    this.load.spritesheet('sona-junior', 'assets/png/other/sona-junior-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
    this.load.spritesheet('bianca', 'assets/png/other/bianca.png', {
      frameWidth: 325,
      frameHeight: 99
    })
    this.load.spritesheet('junior', 'assets/png/other/junior.png', {
      frameWidth: 325,
      frameHeight: 99
    })
  }

  create() {
    this.hyperfun = this.sound.add("hyperfun", { loop: true });
    this.hyperfun.play();

    this.add.image(225, 400, "creditos");

    this.voltar = this.physics.add
      .sprite(50, 50, "voltar")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("botao", { loop: false });
        this.cameras.main.fadeOut(187);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.hyperfun.stop(); // a interatividade só acontece ao clicar/tocar no botão
          this.scene.stop('creditos')
          this.scene.start('abertura')
        })
      })
    
    this.add.sprite(250, 200, 'bianca');
    this.add.sprite(75, 200, 'sona-bianca').setScale(0.5);
    this.add.text(225, 280, 'Construção do jogo físico\ne parte eletrônica', {
      fontFamily: 'Arial',
      fontSize: '23px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5, 0.5);

    this.add.sprite(200, 450, 'junior');
    this.add.sprite(362, 450, 'sona-junior').setScale(0.5); // trocar por sprite novo
    this.add.text(225, 530, 'Idealização, programação\nweb, arte e game design', {
      fontFamily: 'Arial',
      fontSize: '23px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5, 0.5);

    this.add.text(225, 650, 'Professores/Orientadores:', {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center'
    }).setOrigin(0.5, 0.5);
    
    this.add.text(225, 700, 'Clayrton M. Henrique\nEderson Torresini, "Boi"', {
      fontFamily: 'Arial',
      fontSize: '28px',
      fontStyle: 'italic',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5, 0.5);
  }

  update() {}
}
