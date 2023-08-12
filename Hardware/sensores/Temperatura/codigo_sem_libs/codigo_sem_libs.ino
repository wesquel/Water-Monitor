void setup() 
{
	Serial.begin(9600);
}

void loop() 
{
  uint8_t number, frac;
	DS18B20_convert(4);
	DS18B20_read(4, &number, &frac);
	Serial.print(number);
	Serial.print('.');
	Serial.println(frac);

	delay(1000);
}

uint8_t DS18B20_start(uint8_t pin)
{
	uint8_t init;

	pinMode(pin, OUTPUT);
	digitalWrite(pin, 0);
	delayMicroseconds(480);

	pinMode(pin, INPUT);
	delayMicroseconds(80);

	if(!(digitalRead(pin)))
		init = 1;
	else
		init = -1;

	delayMicroseconds(400);

	return init;
}

uint8_t DS18B20_write(uint8_t pin, uint8_t data)
{
	for (int i = 0; i < 8; i++)
	{
		if(data & (1 << i))
		{
			pinMode(pin, OUTPUT);
			digitalWrite(pin, 0);
			delayMicroseconds(1);

			pinMode(pin, INPUT);
			delayMicroseconds(60);
		}
		else
		{
			pinMode(pin, OUTPUT);
			digitalWrite(pin, 0);
			delayMicroseconds(60);

			pinMode(pin, INPUT);
			delayMicroseconds(1);
		}
	}

}

void DS18B20_read(uint8_t pin, uint8_t* number, uint8_t* frac)
{
	*frac = 0;
	*number = 0;

	for(int i = 0; i < 4; i++)
	{
		pinMode(pin, OUTPUT);

		digitalWrite(pin, 0);
		delayMicroseconds(2);

		pinMode(pin, INPUT);
		if (digitalRead(pin))  // if the pin is HIGH
		{
			*frac |= 1<<i;  // read = 1
		}
		delayMicroseconds(60);  // wait for 60 us
	}
	for(int i = 0; i < 12; i++)
	{
		pinMode(pin, OUTPUT);

		digitalWrite(pin, 0);
		delayMicroseconds(2);

		pinMode(pin, INPUT);
		if (digitalRead(pin))  // if the pin is HIGH
		{
			*number |= 1<<i;  // read = 1
		}
		delayMicroseconds(60);  // wait for 60 us
	}
}


void DS18B20_convert(uint8_t pin)
{
	DS18B20_start(pin);
	delayMicroseconds(1);
	DS18B20_write(pin, 0xCC);  // skip ROM
	DS18B20_write (pin, 0x44);  // convert t
	delayMicroseconds(800);

	DS18B20_start(pin);
	delayMicroseconds(1);
	DS18B20_write(pin, 0xCC);  // skip ROM
	DS18B20_write (pin, 0xBE);  // Read Scratch-pad
}
