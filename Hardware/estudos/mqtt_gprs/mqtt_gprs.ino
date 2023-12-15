#define TINY_GSM_MODEM_SIM800
#include <TinyGsmClient.h>
#include <PubSubClient.h>

char* broker =  "test.mosquitto.org";
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
  setupGsm();

  client.setServer(broker, 1883);
  client.setCallback(callback);
}

unsigned long t;
String msg;

void loop() {
  if(!client.connected())
  {
    reconnect();
  }

  client.loop();

  if(millis() - t > 5000)
  {
    t = millis();
    msg = "";
    msg += "{";
    msg += "sensor: ";
    msg += t;
    msg += "}";
    Serial.println("publicando: " + msg);
    client.publish("WaterPro/sensors", msg.c_str());
  }
}

void callback(char* topic, byte* payload, unsigned int length)
{
  Serial.print("Recebido [");
  Serial.print(topic);
  Serial.print("] ");
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
      Serial.print("Failed to connect to mqtt...");
      delay(10000);
      ESP.restart();
    }
  }
}
