import asyncio
from dotenv import load_dotenv
from os import getenv
import paho.mqtt.client as mqtt
from datetime import datetime
from smbus3 import SMBus
from random import randint
import threading
from pathlib import Path
from play_sounds import play_file_async

load_dotenv()


class PinballConfig:
    """Configuration class for Pinball settings"""

    def __init__(self):
        """Initialize the PinballConfig class"""

        self.I2C_BUS = int(getenv("I2C_BUS", default="1"))
        self.I2C_ADDRESS = int(getenv("I2C_ADDRESS", default="16"))
        self.I2C_READ_INTERVAL = float(
            getenv("I2C_READ_INTERVAL", default="0.1"))
        self.MQTT_LOOP_INTERVAL = float(
            getenv("MQTT_LOOP_INTERVAL", default="1.0"))
        self.MAIN_LOOP_INTERVAL = float(
            getenv("MAIN_LOOP_INTERVAL", default="2.0"))
        self.I2C_ERROR_RETRY_DELAY = float(
            getenv("I2C_ERROR_RETRY_DELAY", default="1.0")
        )

        self.MQTT_HOST = getenv("MQTT_HOST", default="feira-de-jogos.dev.br")
        self.MQTT_PORT = int(getenv("MQTT_PORT", default="1883"))
        self.MQTT_TIMEOUT = int(getenv("MQTT_TIMEOUT", default="60"))
        self.MQTT_TOPIC = getenv(
            "MQTT_TOPIC", default="adc20251/pinball-et-circensis/")


class Pinball:
    """Pinball machine"""

    def __init__(self):
        """Initialize the Pinball class"""

        self.config = PinballConfig()
        self.mode = None
        self.password = None
        self.running = False

        self.bus = SMBus(self.config.I2C_BUS)
        self.i2c_data = None
        self.i2c_lock = threading.Lock()
        self.i2c_error_count = 0
        self.i2c_read_count = 0

        self.placar = 0
        self.pontos[10] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

        self.mqtt_client = mqtt.Client(
            mqtt.CallbackAPIVersion.VERSION2)  # type: ignore
        self.mqtt_error_count = 0

    def log(self, message):
        """Log a message"""

        print(datetime.now().strftime("[%H:%M:%S]"), message)

    def on_connect(self, client, userdata, flags, reason_code, properties):
        """Handle MQTT connection"""

        self.log("Conectado ao broker MQTT")
        client.subscribe(self.config.MQTT_TOPIC + "#", qos=1)

    def createPassword(self):
        """Generate a random password"""

        return f"{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}"

    def on_message(self, client, userdata, msg):
        """Handle incoming MQTT messages"""

        if msg.topic == self.config.MQTT_TOPIC + "modo":
            self.mode = msg.payload.decode()

            if self.mode == "espera":
                self.password = self.createPassword()
                self.log(f"Senha gerada: {self.password}")

                self.placar = 0
                self.log(f"Placar zerado: {self.placar}")

                self.log("Modo espera ativado.")

            elif self.mode == "jogando":
                self.log("Modo jogando ativado!")

    async def play_music(self):
        """Play background music"""

        while self.running:
            self.log("Tocando música de fundo...")
            await play_file_async(
                Path("./assets/sounds/musica-fundo.mp3"),
                block=True,
            )

    async def read_i2c_data(self):
        """Continuously read I2C data in a separate async task"""

        self.log("Iniciando leitura I2C assíncrona...")

        while self.running:
            try:
                loop = asyncio.get_event_loop()
                data = await loop.run_in_executor(
                    None, lambda: self.bus.read_i2c_block_data(
                        self.config.I2C_ADDRESS, 0, 10)
                )

                with self.i2c_lock:
                    self.i2c_data = data

                    for sensor in data:
                        if data[sensor] > 0:
                            self.placar += data[sensor] * self.pontos[sensor]

                    self.i2c_read_count += 1

                if self.i2c_read_count % 50 == 0:
                    self.log(
                        f"Dados I2C lidos: {data} (total: {self.i2c_read_count})")

                self.i2c_error_count = 0

                await asyncio.sleep(self.config.I2C_READ_INTERVAL)

            except Exception as e:
                self.i2c_error_count += 1
                self.log(
                    f"Erro ao ler dados I2C (#{self.i2c_error_count}): {e}")
                await asyncio.sleep(self.config.I2C_ERROR_RETRY_DELAY)

    async def mqtt_loop(self):
        """Handle MQTT operations in a separate async task"""

        self.log("Iniciando loop MQTT assíncrono...")

        while self.running:
            try:
                self.mqtt_client.loop()

                self.mqtt_client.publish(
                    self.config.MQTT_TOPIC + "estado", self.mode, qos=1
                )

                if self.mode == "espera":
                    self.mqtt_client.publish(
                        self.config.MQTT_TOPIC + "senha", self.password, qos=1
                    )
                elif self.mode == "jogando":
                    self.mqtt_client.publish(
                        self.config.MQTT_TOPIC + "placar", self.placar, qos=1
                    )

                self.mqtt_error_count = 0

                await asyncio.sleep(self.config.MQTT_LOOP_INTERVAL)

            except Exception as e:
                self.mqtt_error_count += 1
                self.log(f"Erro no loop MQTT (#{self.mqtt_error_count}): {e}")
                await asyncio.sleep(self.config.MQTT_LOOP_INTERVAL)

    async def main_loop(self):
        """Main application loop that logs current state"""

        self.log("Iniciando loop principal...")

        while self.running:
            try:
                if self.mode == "espera":
                    self.log(f"Em espera. Senha: {self.password}")

                elif self.mode == "jogando":
                    self.log(f"Jogando! Placar atual: {self.placar}")

                with self.i2c_lock:
                    if self.i2c_data is not None:
                        self.log(f"Último dado I2C: {self.i2c_data}")

                await asyncio.sleep(self.config.MAIN_LOOP_INTERVAL)

            except Exception as e:
                self.log(f"Erro no loop principal: {e}")
                await asyncio.sleep(self.config.MAIN_LOOP_INTERVAL)

    def setup(self):
        """Setup the initial state of the Pinball object"""

        self.mode = "espera"
        self.password = self.createPassword()
        self.running = True

        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect(
            self.config.MQTT_HOST, self.config.MQTT_PORT, self.config.MQTT_TIMEOUT
        )

    async def run(self):
        """Run all async tasks concurrently"""

        try:
            tasks = [
                asyncio.create_task(self.play_music()),
                asyncio.create_task(self.read_i2c_data()),
                asyncio.create_task(self.mqtt_loop()),
                asyncio.create_task(self.main_loop()),
            ]

            await asyncio.gather(*tasks)

        except KeyboardInterrupt:
            self.log("Interrupção do usuário!")

        finally:
            self.running = False
            self.log("Fechando aplicação...")

            for task in asyncio.all_tasks():
                if not task.done():
                    task.cancel()

            try:
                self.bus.close()
            except Exception as e:
                self.log(f"Erro ao fechar bus I2C: {e}")

            try:
                self.mqtt_client.disconnect()
            except Exception as e:
                self.log(f"Erro ao desconectar MQTT: {e}")

            self.log("Aplicação fechada.")


if __name__ == "__main__":
    """Initial setup and run"""

    pinball = Pinball()
    pinball.setup()
    asyncio.run(pinball.run())
