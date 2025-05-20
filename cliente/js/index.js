/*global Phaser, io*/
/*eslint no-undef: "error"*/
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

        this.audio = document.querySelector("audio");
        this.iceServers = {
            iceServers: [
                {
                    urls: "stun:feira-de-jogos.dev.br",
                },
                {
                    urls: "stun:stun.1.google.com:19302",
                },
            ],
        };
        this.socket = io();
        
        this.socket.on("connect", () => {
            console.log(`Usuário ${this.socket.id} conectado no servidor`);
        })

        this.scene.add('abertura', abertura);
        this.scene.add('precarregamento', precarregamento);
        this.scene.add('sala', sala);
        this.scene.add('creditos', creditos);
        this.scene.add('rankingPersonal', rankingPersonal);
        this.scene.add('rankingGlobal', rankingGlobal);
        this.scene.add('fase1', fase1);

        this.scene.start('abertura');

        this.mqttClient = mqtt.connect("wss://em.sj.ifsc.edu.br/mqtt/")

        this.mqttClient.on("connect", () => {
            console.log("Conectado ao broker MQTT!");
        });

        this.mqttClient.subscribe("adc20251/pinball-space/#", () => {
            console.log("inscrito no tópico adc20251/pinball-space/#")
        })

        this.mqttClient.on("message", (topic, message) => {
            let msg = message.toString()
            console.log(topic, msg);

            if (msg === 'fase1') {
                this.scene.stop();
                this.scene.start("fase1");
            }
            if (msg === 'rankingP') {
                this.scene.start("rankingPersonal");
            }
            if (msg === 'rankingG') {
                this.scene.start("rankingGlobal");
            }
        })
    }
}

window.onload = () => {
    window.game = new Game()
}
