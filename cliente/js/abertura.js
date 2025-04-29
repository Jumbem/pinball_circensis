export default class abertura extends Phaser.Scene {

    constructor () {
        super('abertura')
    }

    init() { }

    preload () {
        this.load.image('bg', 'assets/abertura-bg.png')                          // objeto "bg" e a localização do objeto dentro do codespace
        this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
            frameWidth: 40,
            frameHeight: 29
        })
    }

    create () {
        this.add.image(225, 400, 'bg')                                          // sempre plotar a imagem no centro da tela
        this.anims.create({
            key: 'jensonbutton-pressing',
            frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
            frameRate: 60
        })
        this.jensonbutton = this.add.sprite(225, 300, 'jensonbutton')
        this.jensonbutton.setInteractive().on('pointerdown', () => {
            this.jensonbutton.play('jensonbutton-pressing')
            if ('vibrate' in navigator) {
                navigator.vibrate(100)
            }
        })

        this.jensonbutton.on('animationcomplete', () => {
            this.scene.stop()
            this.scene.start('precarregamento')
        })

    }

    update () { }
}

//init(){ }
//preload() {
//    this.load.image('fundo', 'assets/capa.png')
//    this.load.spritesheet('botao', 'assets/botao.png', {
//        frameWidth: 250,
//        frameHeight: 130
//    })
//create() {
//    this.add.image(400, 225, 'fundo')
//    this.anims.create({
//        key: 'botao',
//        frames: this.anims.generateFrameNumbers('botao', { start: 0, end: 1 }),
//       frameRate: 30
//    })
//    this.botao = this.add.sprite(600, 240, 'botao')
//    this.botao
//        .setInteractive()
//        .on('pointerdown', () => {
//            this.botao.play('botao')
//           this.time.delayedCall(200, () => {
//                this.scene.start('precarregamento');
//            })
//        })
//update() { }