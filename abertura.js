export default class abertura extends Phaser.Scene {

    constructor () {
        super('abertura')
    }

    preload () {
        this.load.image('bg', 'assets/abertura-bg.png') // objeto "bg" e a localização do objeto dentro do codespacec
    }

    create () {
        this.add.image(400, 225, 'bg') // sempre plotar a imagem no centro da tela
    }
}
