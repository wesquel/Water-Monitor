#include <OneWire.h>  
#include <DallasTemperature.h>

#define temp 4
OneWire temp_one_wire(temp);  
DallasTemperature temp_sensor(&temp_one_wire); 

void setup(void)
{ 
 Serial.begin(9600); 
 temp_sensor.begin();
} 

void loop(void)
{ 

 temp_sensor.requestTemperatures(); 
 Serial.print("A temperatura é: "); 
 Serial.println(temp_sensor.getTempCByIndex(0)); // Pega a temperatura em graus Celsius getTempC.
 delay(100);
}