/*global Phaser, io*/
/*eslint no-undef: "error"*/
export default class fase1 extends Phaser.Scene {

  constructor () {
    super('fase1')
  }

  init () { }

  preload () { 
    this.load.audio("ost", "assets/ost.mp3")
    this.load.audio("honk", "assets/honk.mp3")
    this.load.spritesheet('jensonbutton', 'assets/jensonbutton.png', {
      frameWidth: 64, // os tamanhos devem sempre corresponder ao tamanho do frame do objeto/personagem
      frameHeight: 40
    })
  }

  create () {
    this.fullscreen = this.add.image(680, 50, "fullscreen")
      .setInteractive()
      .setDepth(50)
      .setScale(0.01)
      .setScrollFactor(0)
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      });
    
    this.ost = this.sound.add("ost", { loop: true }).play(); // é recomendado deixar trilhas e efeitos primeiro porque demoram mais a carregar
    //this.jensonbutton = this.add.sprite(225, 300, 'jensonbutton') // Comando de física (desnecessário p/ um botão)
   
//    if (this.game.jogadores.primeiro === this.game.socket.id) {
//      this.game.remoteConnection = new RTCPeerConnection(this.game.iceServers);
//      this.game.dadosJogo = this.game.remoteConnection.createDataChannel(
//        "dadosJogo",
//        { negotiated: true, id: 0 },
//      );

//      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
//        candidate &&
//          this.game.socket.emit("candidate", this.game.sala, candidate);
//      };

//      this.game.remoteConnection.ontrack = ({ streams: [stream] }) => {
//        this.game.audio.srcObject = stream;
//      };

//      if (this.game.midias) {
//        this.game.midias
//          .getTracks()
//          .forEach((track) =>
//            this.game.remoteConnection.addTrack(track, this.game.midias),
//          );
//      }

//      this.game.socket.on("offer", (description) => {
//        this.game.remoteConnection
//          .setRemoteDescription(description)
//          .then(() => this.game.remoteConnection.createAnswer())
//          .then((answer) =>
//            this.game.remoteConnection.setLocalDescription(answer),
//          )
//          .then(() =>
//            this.game.socket.emit(
//              "answer",
//              this.game.sala,
//              this.game.remoteConnection.localDescription,
//            ),
//          );
//      });

//      this.game.socket.on("candidate", (candidate) => {
//        this.game.remoteConnection.addIceCandidate(candidate);
//      });

      //this.personagemLocal = this.physics.add.sprite(100, 100, "jensonbutton");
      //this.personagemRemoto = this.add.sprite(100, 150, "botao");
//    } else if (this.game.jogadores.segundo === this.game.socket.id) {
//      this.game.localConnection = new RTCPeerConnection(this.game.iceServers);
//      this.game.dadosJogo = this.game.localConnection.createDataChannel(
//        "dadosJogo",
//        { negotiated: true, id: 0 },
//      );

//      this.game.localConnection.onicecandidate = ({ candidate }) => {
//        this.game.socket.emit("candidate", this.game.sala, candidate);
//      };

//      this.game.localConnection.ontrack = ({ streams: [stream] }) => {
//        this.game.audio.srcObject = stream;
//      };

//      if (this.game.midias) {
//        this.game.midias
//          .getTracks()
//          .forEach((track) =>
//            this.game.localConnection.addTrack(track, this.game.midias),
//          );
//      }

//      this.game.localConnection
//        .createOffer()
//        .then((offer) => this.game.localConnection.setLocalDescription(offer))
//        .then(() =>
//          this.game.socket.emit(
//            "offer",
//            this.game.sala,
//            this.game.localConnection.localDescription,
//          ),
//        );

//      this.game.socket.on("answer", (description) => {
//        this.game.localConnection.setRemoteDescription(description);
//      });

//      this.game.socket.on("candidate", (candidate) => {
//        this.game.localConnection.addIceCandidate(candidate);
//      });

      //this.personagemLocal = this.physics.add.sprite(100, 150, "jensonbutton");
      //this.personagemRemoto = this.add.sprite(100, 100, "botao");
//    } else {
//      window.alert("sala cheia!")
//      this.scene.stop();
//      this.scene.start("sala");
//    }

//    this.game.dadosJogo.onopen = () => {
//      console.log("Conexão de dados aberta!");
//    };

//    try {
//      if (this.game.dadosJogo.readyState === "open") {
//       if (this.personagemLocal) {
//          this.game.dadosJogo.send(
//            JSON.stringify({
//              personagem: {
//                x: this.personagemLocal.x,
//                y: this.personagemLocal.y,
//                frame: this.personagemLocal.frame.name,
//              },
//            }),
//          );
//        }
//      }
//    } catch (error) {
//      console.error(error);
//    }

    this.jensonbutton.setInteractive().on('pointerdown', () => { // a interatividade só acontece ao clicar/tocar no botão
      this.jensonbutton.play('jensonbutton-pressing')
      this.honk = this.sound.add("honk", { loop: false}).play()
      if ('vibrate' in navigator) {
        navigator.vibrate(100)
      }
    })
  }

  update () { }
}