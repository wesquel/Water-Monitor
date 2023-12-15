#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

char* broker = "test.mosquitto.org";
char* user = "gatewayWaterPro";
char* password = "";

const char* ssid = "brisa-603071"; 
const char* pasword_wifi = "xz4iv3wb"; 

void callback(char*, byte*, unsigned int);
void reconnect();

void setup() 
{
  Serial.begin(9600);

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

void reconnect()
{
  while(!client.connected())
  {
    Serial.println("Connecting...");
    if(client.connect(user))
    {
      Serial.println("Connected");

      client.subscribe("waterPro/test");
    }
    else
    {
      Serial.print("Falha...");
      delay(5000);
    }
  }
}