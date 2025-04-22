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
        this.add.image(400, 225, 'bg')                                          // sempre plotar a imagem no centro da tela
            .setInteractive()
            .on('pointerdown', () => {
            this.scene.stop()
                this.scene.start('precarregamento')
            })
        
        this.jensonbutton = this.add.sprite(400, 400, 'jensonbutton')

        this.anims.create({
            key: 'jensonbutton-press',
            frame: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
            frameRate: 60
        })

        this.jensonbutton.setInteractive().on('pointerdown', () => {
            this.jensonbutton.play('jensonbutton-press')
            if ('vibrate' in navigator) {
                navigator.vibrate(100)
            }
        })

        this.jensonbutton.on('animationcomplete', () => {
            this.scene.stop()
            this.scene.start('precarregamento')
        })

    }

    update() { }
}
