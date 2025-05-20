export default class abertura extends Phaser.Scene {

// usar abertura p/ mostrar logo da Jumbem Entertainment

    constructor () {
        super('abertura')
    }

    init () { }

    preload () {
        this.load.image('bg', 'assets/abertura-bg.png') // image p/ plano de fundo estático
        this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', { // spritesheet para objetos animados
            frameWidth: 200,
            frameHeight: 145
        })
    }

    create () {
        this.add.image(225, 400, 'bg') // sempre plotar a imagem no centro da tela
        this.anims.create({ // criando animação que também pode ser usada em outras telas
            key: 'jensonbutton-pressing',
            frames: this.anims.generateFrameNumbers('jensonbutton', { start: 0, end: 2 }),
            frameRate: 60
        })
        this.jensonbutton = this.add.sprite(225, 300, 'jensonbutton')
        this.jensonbutton
            .setInteractive()
            .on('pointerdown'), () => { // a interatividade só acontece ao clicar/tocar no botão
            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    this.game.midias = stream;
                })
                .catch((error)) => console.error(error);
            this.jensonbutton.play('jensonbutton-pressing')
            if ('vibrate' in navigator) {
                navigator.vibrate(100)
            }
            
        }
    }
        
        //          this.time.delayedCall(200, () => {
        //              this.jensonbutton.on('animationcomplete', () => {
        //                  this.scene.stop()
        //                  this.scene.start('precarregamento')

        this.jensonbutton.on('animationcomplete', () => {
            this.scene.stop()
            this.scene.start('precarregamento') // a mudança de tela só é feita quando a animação é concluída
        })

    }

    update () { }
}