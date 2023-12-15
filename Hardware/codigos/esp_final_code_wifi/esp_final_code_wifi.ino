#include <WiFi.h>
#include <PubSubClient.h>
#include "EBYTE.h"

#define M0 4    // D4 on the board
#define M1 2    // D2 on the board
#define AUX 15  // D15 on the board

#define RX_LORA 19
#define TX_LORA 18

HardwareSerial SerialLora(1);
EBYTE Transceiver(&SerialLora, M0, M1, AUX);

int num_fails = 0;

char* broker =  "mqtt.eclipseprojects.io";
char* user = "gatewayWaterPro";
char* password = "";

const char* ssid = "brisa-603071"; 
const char* pasword_wifi = "xz4iv3wb"; 

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char*, byte*, unsigned int);
void reconnect();

void setup() {
  Serial.begin(9600);
  SerialLora.begin(9600, SERIAL_8N1, RX_LORA, TX_LORA, false);

  Serial.println(Transceiver.init());

  Serial.println(Transceiver.GetAirDataRate());
  Serial.println(Transceiver.GetChannel());

  Transceiver.SetAddress(10);
  Transceiver.SetChannel(23);
  Transceiver.SaveParameters(TEMPORARY);
  Transceiver.PrintParameters();

  WiFi.begin(ssid, pasword_wifi);
  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nOk");

  client.setServer(broker, 1883);
  client.setCallback(callback);
}


void loop() {
  if(!client.connected())
  {
    reconnect();
  }
  client.loop();

  if(SerialLora.available() > 0)
  {
    String input = SerialLora.readString();
    Serial.print("pubblishing: ");
    Serial.println(input);
    client.publish("monitoramento_agua/servidor", input.c_str());
  }
}

void callback(char* topic, byte* payload, unsigned int length)
{
  String s = "";
  for (int i = 0; i < length; i++)
  {
    s+= (char)payload[i];
  }
  Serial.println(s);
}

void reconnect()
{
  while(!client.connected())
  {
    Serial.println("Connecting MQTT...");
    if(client.connect(user))
    {
      Serial.println("Connected");

      client.subscribe("waterPro/test");
    }
    else
    {
      if(num_fails > 4)
      {
        Serial.println("Num_fails = 5, reseting...");
        ESP.restart();
      }
      num_fails++;
      Serial.print("Failed to connect to mqtt...");
      delay(5000);
    }
  }
}
