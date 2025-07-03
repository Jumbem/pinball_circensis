import asyncio
from dotenv import load_dotenv
from os import getenv
import paho.mqtt.client as mqtt
from datetime import datetime
from smbus3 import SMBus
from random import randint
from time import sleep

load_dotenv()


class Pinball:
    def __init__(self):
        self.mode = None
        self.password = None

        self.bus = SMBus(int(getenv("I2C_BUS", default="1")))

        self.mqtt_host = getenv("MQTT_HOST", default="feira-de-jogos.dev.br")
        self.mqtt_port = int(getenv("MQTT_PORT", default="1883"))
        self.mqtt_timeout = int(getenv("MQTT_TIMEOUT", default="60"))
        self.mqtt_topic = getenv("MQTT_TOPIC", default="adc20251/pinball-et-circensis/")
        self.mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)  # type: ignore

    def log(self, message):
        print(datetime.now().strftime("[%H:%M:%S]"), message)

    def on_connect(self, client, userdata, flags, reason_code, properties):
        self.log("Conectado ao broker MQTT")
        client.subscribe(self.mqtt_topic + "#", qos=1)

    def createPassword(self):
        return f"{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}"

    def on_message(self, client, userdata, msg):
        if msg.topic == self.mqtt_topic + "modo":
            self.mode = msg.payload.decode()

            if self.mode == "espera":
                self.log("Modo espera ativado.")
                self.password = self.createPassword()
                self.log(f"Senha gerada: {self.password}")

            elif self.mode == "jogando":
                self.log("Modo jogando ativado!")

    def setup(self):
        self.mode = "espera"
        self.password = self.createPassword()

        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect(self.mqtt_host, self.mqtt_port, self.mqtt_timeout)

    async def read_i2c_data(self):
        # Implement I2C data reading logic here
        pass

    async def loop(self):
        try:
            while True:
                if self.mode == "espera":
                    self.log("Em espera, senha: " + self.password)

                elif self.mode == "jogando":
                    self.log("Jogando!")

                self.read_i2c_data()

                self.mqtt_client.publish(self.mqtt_topic + "estado", self.mode, qos=1)
                self.mqtt_client.publish(
                    self.mqtt_topic + "senha", self.password, qos=1
                )
                self.mqtt_client.loop()

                sleep(1)

        except KeyboardInterrupt:
            self.log("Interrupção do usuário!")

        finally:
            self.log("Fechando aplicação...")
            self.bus.close()
            self.mqtt_client.disconnect()


if __name__ == "__main__":
    pinball = Pinball()
    pinball.setup()
    asyncio.run(pinball.loop())
