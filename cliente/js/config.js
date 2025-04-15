export default {
    type: Phaser.AUTO,
    width: 800, // tamanho da tela; se for muito grande, pode haver problemas de desempenho
    height: 450,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { X: 0, y: 0 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}