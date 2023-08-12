#define us_pin_trigger 8
#define us_pin_echo 9

void setup()
{
	Serial.begin(9600);
}

void loop()
{
	Serial.print(us_distance(us_pin_trigger, us_pin_echo, 20000UL));	
	Serial.println(" cm");
  delay(500);
}

float us_distance(uint8_t pin_trigger, uint8_t pin_echo, unsigned long timeout)
{
	pinMode(pin_trigger, OUTPUT);
	digitalWrite(pin_trigger, HIGH);
	delayMicroseconds(10);
	digitalWrite(pin_trigger, LOW);

	unsigned long prev_time = micros();
	while(!(digitalRead(pin_echo)) && (micros() - prev_time) < timeout);
	prev_time = micros();
	while((digitalRead(pin_echo)) && (micros() - prev_time) < timeout);

	return (micros() - prev_time) * 0.034 / 2; 
}
