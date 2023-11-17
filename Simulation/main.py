import json
import random
import time

import paho.mqtt.client as mqtt

broker_address = "mqtt.eclipseprojects.io"
port = 1883
topic = "monitoramento_agua/servidor"
client_id = f'python-mqtt-{random.randint(0, 10000)}'


def on_connect(client, user_data, flags, rc):
    if rc == 0:
        print("Conexão MQTT estabelecida!")
    else:
        print(f"Erro na conexão, código de erro {rc}")


mqtt_client = mqtt.Client(client_id)
mqtt_client.on_connect = on_connect

mqtt_client.connect(broker_address, port, 60)

while True:
    message_data = {
        "MACAddress": "00B0D063C226",
        "condutividade": random.randint(0, 3),
        "ph": random.randint(0, 14),
        "temperatura": random.randint(0, 100),
        "turbidez": random.randint(0, 5),
        "nivel": random.randint(0, 100)
    }

    message_payload = json.dumps(message_data)

    mqtt_client.publish(topic, message_payload)

    print(f"Mensagem enviada: {message_data}")

    time.sleep(2)
