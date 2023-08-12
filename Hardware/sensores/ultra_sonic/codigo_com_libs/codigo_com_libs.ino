#include <Ultrasonic.h>

#define us_trigger_pin 8
#define us_echo_pin 9

Ultrasonic u_s(us_trigger_pin, us_echo_pin);

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print(u_s.read(CM));
  Serial.println("cm");
  delay(500);
}
