import config from './config.js'
import abertura from './abertura.js'
import precarregamento from './precarregamento.js'
import sala from './sala.js'
import creditos from './creditos.js'
import rankingPersonal from './ranking-personal.js'
import rankingGlobal from './ranking-global.js'
import fase1 from './fase1.js'

class Game extends Phaser.Game {
    constructor () {
        super(config)

        this.scene.add('abertura', abertura)
        this.scene.add('precarregamento', precarregamento)
        this.scene.add('sala', sala)
        this.scene.add('creditos', creditos)
        this.scene.add('rankingPersonal', rankingPersonal)
        this.scene.add('rankingGlobal', rankingGlobal)
        this.scene.add('fase1', fase1)
        this.scene.start('abertura')
    }
}

window.onload = () => {
    window.game = new Game()
}
