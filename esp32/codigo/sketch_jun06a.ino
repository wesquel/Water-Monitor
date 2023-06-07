#include <WiFi.h> 
#include <PubSubClient.h>
#include <ArduinoJson.h>
#define TOPICO_SUBSCRIBE "monitoramento_agua/servidor"   
#define TOPICO_PUBLISH   "monitoramento_agua/servidor"  
#include <Ultrasonic.h> //Inclui a biblioteca do ultrassônico
#define ID_MQTT  "mqtt-explorer-31afbadf"     
#include <OneWire.h>  
#include <DallasTemperature.h>
#define dados 32 /*o pino de dados do sensor está ligado na porta 2 do Arduino*/

OneWire oneWire(dados);  /*Protocolo OneWire*/
/********************************************************************/
DallasTemperature sensors(&oneWire); /*encaminha referências OneWire para o sensor*/

Ultrasonic ultrassom(18, 19); //Cria o objeto ultrassom, do tipo Ultrassonic, e define os pinos onde está ligado o TRIG(pino 5) e o ECHO(pino 4) respectivamente
long distancia; //cria a variável distancia do tipo long

const char* SSID = "Joselita"; 
const char* PASSWORD = "lita2030"; 
const char* mqttTopic = "monitoramento_agua/servidor";
const char* BROKER_MQTT = "mqtt.eclipseprojects.io"; 
int BROKER_PORT = 1883;
 
WiFiClient espClient;
PubSubClient MQTT(espClient);
  
void init_serial(void);
void init_wifi(void);
void init_mqtt(void);
void reconnect_wifi(void); 
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void verifica_conexoes_wifi_mqtt(void);
const int digitalPin = 19; // Pino digital a ser lido
int entrada_sensor_de_turbidez = 0;
StaticJsonDocument<200> doc;   
 
void setup() {
    init_serial();
    init_wifi();
    init_mqtt();
    sensors.begin();
    Serial.begin(9600);
    pinMode(digitalPin, INPUT); // Define o pino como entrada
   ;
}
  
void loop() {
    
    /* garante funcionamento das conexões WiFi e ao broker MQTT */
    verifica_conexoes_wifi_mqtt();
    int sensorValue = digitalRead(digitalPin);
    distancia = ultrassom.Ranging(CM);//ultrassom.Ranging(CM) retorna a distancia em centímetros(CM)
    Serial.print("Distância = ");//Imprime na serial o texto "Distância = "
    Serial.print(distancia); //Imprime na serial o valor da variável distancia
    Serial.println("cm"); //Imprime na serial o texto "cm"
    entrada_sensor_de_turbidez = analogRead(34);
    sensors.requestTemperatures(); /* Envia o comando para leitura da temperatura */
    /********************************************************************/
    Serial.println(sensors.getTempCByIndex(0)); /* Endereço do sensor */
    Serial.print(entrada_sensor_de_turbidez);
    delay(1000); //Intervalo de 1 segundo
    
    doc["distancia"] = distancia ;
    doc["temperatura"] = sensors.getTempCByIndex(0);
    doc["turbidez"] = entrada_sensor_de_turbidez;
    /* Converte o objeto JSON para uma string */
    String jsonStr;
    serializeJson(doc, jsonStr);

    /* Envia a mensagem JSON para o broker MQTT */
    MQTT.publish(TOPICO_PUBLISH, jsonStr.c_str());
    /* Envia frase ao broker MQTT */
    MQTT.publish(TOPICO_PUBLISH, jsonStr.c_str());

    Serial.print("Estou enviando a mensagem JSON: ");
    Serial.println(jsonStr);
    /*
    MQTT.publish(TOPICO_PUBLISH, "Hello Robson!");

    Serial.print("Estou enviando a mensagem: ");
    Serial.print("Hello Robson!");
    Serial.println();*/
 
    /* keep-alive da comunicação com broker MQTT */    
    MQTT.loop();
    /* Agurda 1 segundo para próximo envio */
    delay(1000);   
}

void init_serial() {
    Serial.begin(9600);
}
 
void init_wifi(void) {
    delay(10);
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde");
    reconnect_wifi();
}
  
void init_mqtt(void) {
    MQTT.setServer(BROKER_MQTT, BROKER_PORT); 
    MQTT.setCallback(mqtt_callback);            
}
  
void mqtt_callback(char* topic, byte* payload, unsigned int length) {
    String msg;
 
    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
    }
    Serial.print("[MQTT] Mensagem recebida: ");
    Serial.println(msg);     
}
  
void reconnect_mqtt(void) {
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPICO_SUBSCRIBE); 
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 2s");
            delay(2000);
        }
    }
}
  
void reconnect_wifi() {
    /* se já está conectado a rede WI-FI, nada é feito. 
       Caso contrário, são efetuadas tentativas de conexão */
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(SSID, PASSWORD);
     
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(100);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(SSID);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}
 
void verifica_conexoes_wifi_mqtt(void) {
    /* se não há conexão com o WiFI, a conexão é refeita */
    reconnect_wifi(); 
    /* se não há conexão com o Broker, a conexão é refeita */
    if (!MQTT.connected()) 
        reconnect_mqtt(); 
} 
