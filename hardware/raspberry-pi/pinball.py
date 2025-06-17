from dotenv import load_dotenv
from os import getenv
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt

load_dotenv()
mqtt_host = getenv('MQTT_HOST', default='feira-de-jogos.dev.br')
mqtt_port = int(getenv('MQTT_PORT', default='1883'))
mqtt_timeout = int(getenv('MQTT_TIMEOUT', default='60'))
mqtt_topic = getenv('MQTT_TOPIC', default='adc20251/pinball-et-circensis/')
led = int(getenv('PIN_LED', default='11'))
mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)


def on_connect(client, userdata, flags, reason_code, properties):
    print('Conectado ao broker MQTT')
    client.subscribe(mqtt_topic + '#', qos=1)


def on_message(client, userdata, msg):
    if ''.join([mqtt_topic, 'placar']) == msg.topic:
        print(msg.topic, msg.payload.decode())


def setup():
    GPIO.cleanup()
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(led, GPIO.OUT)
    GPIO.output(led, GPIO.LOW)

    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.connect(mqtt_host, mqtt_port, mqtt_timeout)


def loop():
    try:
        while True:
            mqtt_client.loop()
    except KeyboardInterrupt:
        GPIO.cleanup()
        mqtt_client.disconnect()


if __name__ == '__main__':
    setup()
    loop()
