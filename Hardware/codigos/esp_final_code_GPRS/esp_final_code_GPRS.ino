#define TINY_GSM_MODEM_SIM800

#include <TinyGsmClient.h>
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

char* broker =  "broker.hivemq.com";
char* user = "gatewayWaterPro";
char* password = "";

TinyGsm modemGsm(Serial2);
TinyGsmClient gsmClient(modemGsm);
PubSubClient client(gsmClient);

void callback(char*, byte*, unsigned int);
void reconnect();
void setupGsm();

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);
  SerialLora.begin(9600, SERIAL_8N1, RX_LORA, TX_LORA, false);

  Transceiver.init();
  Transceiver.SetAddress(10);
  Transceiver.SetChannel(23);
  Transceiver.SaveParameters(TEMPORARY);
  Transceiver.PrintParameters();

  setupGsm();
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
    client.publish("WaterPro/sensors", input.c_str());
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

void setupGsm()
{
  Serial.println("Setup GSM...");
  
  Serial.println(modemGsm.getModemInfo());
  
  if(!modemGsm.restart())
  {
    Serial.println("Restarting gsm modem failed");
    delay(10000);
    ESP.restart();
    return;
  }

  Serial.println("Connecting to Network...");

  if(!modemGsm.waitForNetwork())
  {
    Serial.println("Failed to connect to network");
    delay(10000);
    ESP.restart();
    return;
  }

  Serial.println("Connecting to gprs...");
  const char apn[] = "claro.com.br";
  const char gprsUser[] = "claro";
  const char pass[] = "claro";

  if(!modemGsm.gprsConnect(apn, gprsUser, pass))
  {
    Serial.println("Gprs connection failed");
    delay(10000);
    ESP.restart();
    return;
  }

  Serial.println("Setup Gsm Success");
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
