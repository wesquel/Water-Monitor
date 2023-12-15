#include <Ultrasonic.h>

#define us_trigger_pin 4
#define us_echo_pin 3

Ultrasonic u_s(us_trigger_pin, us_echo_pin);

void setup() {
  Serial.begin(9600);
  pinMode(7, OUTPUT);
  digitalWrite(7, HIGH);
}

void loop() {
  Serial.print(u_s.read(CM));
  Serial.println("cm");
  delay(500);
}
