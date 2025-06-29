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
    this.load.spritesheet('sona-bianca', 'assets/sona-bianca-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
    this.load.spritesheet('sona-junior', 'assets/sona-junior-300.png', {
      frameWidth: 300,
      frameHeight: 300
    })
    this.load.spritesheet('bianca', 'assets/bianca.png', {
      frameWidth: 325,
      frameHeight: 99
    })
    this.load.spritesheet('junior', 'assets/junior.png', {
      frameWidth: 325,
      frameHeight: 99
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
    
    this.add.sprite(225, 200, 'bianca');
    this.add.sprite(75, 200, 'sona-bianca').setScale(0.5);
    //this.add.text(225, 200, 'BIANCA', {
    //  fontFamily: 'Arial',
    //  fontSize: '50px',
    //  fontStyle: 'bold',
    //  color: '#ffffff',
    //  align: 'center'
    //}).setOrigin(0.5, 0.5);
    this.add.text(225, 150, 'Construção do\njogo físico e\nparte eletrônica', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.add.sprite(225, 500, 'junior');
    this.add.sprite(325, 600, 'sona-junior').setScale(0.5);
    //this.add.text(225, 600, 'JUNIOR', {
    //  fontFamily: 'Arial',
    //  fontSize: '50px',
    //  fontStyle: 'bold',
    //  color: '#ffffff',
    //  align: 'center'
    //}).setOrigin(0.5, 0.5);
    this.add.text(225, 550, 'Idealização, programação\nweb, arte e game design', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.add.text(225, 650, 'Professores/Orientadores:', {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5, 0.5);
    this.add.text(225, 700, 'Clayrton M. Henrique\nEderson Torresini, "Boi"', {
      fontFamily: 'Arial',
      fontSize: '28px',
      fontStyle: 'bold italic',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5, 0.5);
  }

  update() {}
}
