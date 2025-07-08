/*global Phaser, mqtt, io*/
/*eslint no-undef: "error"*/
import config from "./config.js";
import abertura from "./abertura.js";
import precarregamento from "./precarregamento.js";
import gameover from "./gameover.js";
import creditos from "./creditos.js";
import ranking from "./ranking.js";
import jogar from "./jogar.js";
import newhighscore from "./newhighscore.js";
import placar from "./placar.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

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
    //this.socket = io();

    //this.socket.on("connect", () => {
    //  console.log(`Usuário ${this.socket.id} conectado no servidor`);
    //});

    this.scene.add("abertura", abertura);
    this.scene.add("precarregamento", precarregamento);
    this.scene.add("gameover", gameover);
    this.scene.add("creditos", creditos);
    this.scene.add("ranking", ranking);
    this.scene.add("jogar", jogar);
    this.scene.add("newhighscore", newhighscore);
    this.scene.add("placar", placar);

    this.mqttClient = mqtt.connect("wss://feira-de-jogos.dev.br/mqtt/");

    this.mqttClient.on("connect", () => {
      console.log("Conectado ao broker MQTT!");
    });

    this.mqttTopic = "adc20251/pinball-et-circensis/";
    this.mqttClient.subscribe(`${this.mqttTopic}#`, { qos: 1 }, () => {
      console.log(`Inscrito no tópico ${this.mqttTopic}#`);
    });

    this.cenaAtual = "abertura";
    this.scene.start(this.cenaAtual);

    this.placar = 0;
    this.mqttClient.on("message", (topic, message) => {
      let msg = message.toString();
      console.log(topic, msg);

      if (topic === `${this.mqttTopic}jogar`) {
        this.scene.stop(this.cenaAtual);
        this.scene.start("jogar");
      } else if (topic === `${this.mqttTopic}ranking`) {
        this.scene.stop(this.cenaAtual);
        this.scene.start("ranking");
      } else if (topic === `${this.mqttTopic}placar`) {
        this.placar = Number(msg);
      } else if (topic === `${this.mqttTopic}creditos`) {
        this.scene.stop(this.cenaAtual);
        this.scene.start("creditos");
      }
    });
  }
}

window.onload = () => {
  window.game = new Game();
};
