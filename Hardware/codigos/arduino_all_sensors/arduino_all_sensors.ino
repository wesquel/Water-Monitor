#include <Ultrasonic.h>
#include <OneWire.h>  
#include <DallasTemperature.h>

// Ultra Sonic
#define us_trigger_pin 4
#define us_echo_pin 3
Ultrasonic u_s(us_trigger_pin, us_echo_pin);

// Turbidity
#define pin_turbidez A0
int reads;
float voltage;
float ntu;

// Temperature
#define temp 8
OneWire temp_one_wire(temp);  
DallasTemperature temp_sensor(&temp_one_wire); 

void setup() {
  Serial.begin(9600);
  pinMode(pin_turbidez, INPUT);
}

void loop() {

  // Turbidity
  reads = analogRead(pin_turbidez);
  voltage = reads*5.0/1024;
  ntu = -1120.4*voltage*voltage + 5742.3*voltage - 4352.9;

  // Temperature
  temp_sensor.requestTemperatures(); 

  

  Serial.print(u_s.read(CM));
  Serial.print("cm, ");
  Serial.print("NTU = ");
  Serial.print(ntu);
  Serial.print(", ");
  Serial.print(temp_sensor.getTempCByIndex(0));
  Serial.println("C , ");
  delay(500);
}
