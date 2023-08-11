#include <OneWire.h>  
#include <DallasTemperature.h>

#define temp D4

OneWire temp_one_wire(temp);  

DallasTemperature temp_sensor(&temp_one_wire); 

void setup(void)
{ 
 Serial.begin(9600); 
 temp_sensor.begin();
} 

void loop(void)
{ 

 Serial.print("Iniciando conversão..."); 
 sensors.requestTemperatures(); 
 Serial.println("Pronto");
 Serial.print("A temperatura é: "); 
 Serial.print(sensors.getTempCByIndex(0)); // Pega a temperatura em graus Celsius getTempC.
}