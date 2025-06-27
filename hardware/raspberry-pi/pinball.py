from ast import mod
import asyncio
from dotenv import load_dotenv
from os import getenv
from random import randint

# import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt

load_dotenv()
mqtt_host = getenv("MQTT_HOST", default="feira-de-jogos.dev.br")
mqtt_port = int(getenv("MQTT_PORT", default="1883"))
mqtt_timeout = int(getenv("MQTT_TIMEOUT", default="60"))
mqtt_topic = getenv("MQTT_TOPIC", default="adc20251/pinball-et-circensis/")
mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)  # type: ignore
modo = "espera"
malabarista_task = None
lateral_task = None
saidas_task = None
senha = None

leds = {
    "Malabaris1": 2,
    "Malabaris2": 3,
    "Malabaris3": 4,
    "Lateral1": 10,
    "Lateral2": 9,
    "Lateral3": 11,
    "Saidas1": 6,
    "Saidas2": 13,
    "Saidas3": 19,
    "Saidas4": 26,
    "Rampa": 14,
    "Palhaco": 15,
}

sensores = {
    "Malabaris1": 17,
    "Malabaris2": 27,
    "Malabaris3": 22,
    "Saidas1": 12,
    "Saidas2": 16,
    "Saidas3": 20,
    "Saidas4": 21,
    "Final": 18,
    "Lateral1": 25,
    "Lateral2": 8,
    "Lateral3": 7,
    "BuracoNegro": 24,
    "Funil": 23,
}


def definirSenha():
    global mqtt_client, senha
    # senha aleatória de 4 dígitos
    senha = f"{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}{randint(0, 9)}"
    print(f"Senha definida: {senha}")


def on_connect(client, userdata, flags, reason_code, properties):
    print("Conectado ao broker MQTT")
    client.subscribe(mqtt_topic + "#", qos=1)


def on_message(client, userdata, msg):
    global senha
    if msg.topic == mqtt_topic + "modo":
        global modo
        modo = msg.payload.decode()
        if modo not in ["espera", "jogando"]:
            print(f"Modo inválido recebido: {modo}")
        elif modo == "espera":
            print("Modo espera ativado")
            definirSenha()
        elif modo == "jogando":
            print("Modo jogando ativado")


async def malabarista():
    print("Malabarista iniciado")
    while True:
        # GPIO.output(leds["Malabaris1"], GPIO.HIGH)
        # GPIO.output(leds["Malabaris2"], GPIO.LOW)
        # GPIO.output(leds["Malabaris3"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Malabaris1"], GPIO.LOW)
        # GPIO.output(leds["Malabaris2"], GPIO.HIGH)
        # GPIO.output(leds["Malabaris3"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Malabaris1"], GPIO.LOW)
        # GPIO.output(leds["Malabaris2"], GPIO.LOW)
        # GPIO.output(leds["Malabaris3"], GPIO.HIGH)
        await asyncio.sleep(1)
        print("Malabarista jogando as bolas...")


async def lateral():
    print("Lateral iniciado")
    while True:
        # GPIO.output(leds["Lateral1"], GPIO.HIGH)
        # GPIO.output(leds["Lateral2"], GPIO.LOW)
        # GPIO.output(leds["Lateral3"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Lateral1"], GPIO.LOW)
        # GPIO.output(leds["Lateral2"], GPIO.HIGH)
        # GPIO.output(leds["Lateral3"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Lateral1"], GPIO.LOW)
        # GPIO.output(leds["Lateral2"], GPIO.LOW)
        # GPIO.output(leds["Lateral3"], GPIO.HIGH)
        await asyncio.sleep(1)
        print("Laterais piscando...")


async def saidas():
    print("Saídas iniciado")
    while True:
        # GPIO.output(leds["Saidas1"], GPIO.HIGH)
        # GPIO.output(leds["Saidas2"], GPIO.LOW)
        # GPIO.output(leds["Saidas3"], GPIO.LOW)
        # GPIO.output(leds["Saidas4"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Saidas1"], GPIO.LOW)
        # GPIO.output(leds["Saidas2"], GPIO.HIGH)
        # GPIO.output(leds["Saidas3"], GPIO.LOW)
        # GPIO.output(leds["Saidas4"], GPIO.LOW)
        # await asyncio.sleep(1)
        # GPIO.output(leds["Saidas1"], GPIO.LOW)
        # GPIO.output(leds["Saidas2"], GPIO.LOW)
        # GPIO.output(leds["Saidas3"], GPIO.HIGH)
        # GPIO.output(leds["Saidas4"], GPIO.LOW)
        await asyncio.sleep(1)
        print("Saídas piscando...")


def on_sensor_triggered(channel):
    sensor_name = next((name for name, pin in sensores.items() if pin == channel), None)
    if sensor_name:
        print(f"Sensor {sensor_name} acionado")


def setup():
    # GPIO.setmode(GPIO.BOARD)
    # GPIO.setwarnings(False)

    for led in leds.values():
        pass
        # GPIO.setup(led, GPIO.OUT)
        # GPIO.output(led, GPIO.LOW)

    for sensor in sensores.values():
        pass
        # GPIO.setup(sensor, GPIO.IN)
        # GPIO.add_event_detect(sensor, GPIO.RISING, callback=on_sensor_triggered)

    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.connect(mqtt_host, mqtt_port, mqtt_timeout)

    definirSenha()


async def main():
    global malabarista_task, lateral_task, saidas_task, senha
    try:
        while True:
            if modo == "espera":
                print("Modo espera")
                if not malabarista_task:
                    malabarista_task = asyncio.create_task(malabarista())
                if not lateral_task:
                    lateral_task = asyncio.create_task(lateral())
                if not saidas_task:
                    saidas_task = asyncio.create_task(saidas())
                await asyncio.sleep(1)
            elif modo == "jogando":
                if malabarista_task:
                    malabarista_task.cancel()
                    malabarista_task = None
                if lateral_task:
                    lateral_task.cancel()
                    lateral_task = None
                if saidas_task:
                    saidas_task.cancel()
                    saidas_task = None
                print("Modo jogando")
                await asyncio.sleep(1)

            mqtt_client.publish(mqtt_topic + "estado", modo, qos=1)
            mqtt_client.publish(mqtt_topic + "senha", senha, qos=1)
            mqtt_client.loop()
    except KeyboardInterrupt:
        # GPIO.cleanup()
        mqtt_client.disconnect()


if __name__ == "__main__":
    setup()
    asyncio.run(main())
