#define pH_pin 5

int ph_calibration = 21.3;

void setup()
{
	Serial.begin(9600);
	pinMode(pH_pin, INPUT);
}

void loop()
{
	int ph_read
	float ph_voltage;
	for(int i = 0; i < 10; i++)
	{
		ph_read = analogInput(pH_pin);
		delay(20);
		ph_voltage += ph_read*5/1024;
	}
	ph_voltage = ph_voltage/10;

	float ph_value = -5.7 * ph_voltage + ph_calibration;

	Serial.print("pH: ");
	Serial.println(ph_value);

	delay(1000);
}
