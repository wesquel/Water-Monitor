#include <avr/wdt.h>
#include <avr/interrupt.h>
#include <avr/sleep.h>
#include <avr/power.h>

#include <Ultrasonic.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ADS1X15.h>

#define ACTIVE_PIN 7

// ads
ADS1115 ads(0x48);  // scl A5, sda A4
float voltage_f;
float ntu;

// Ultra Sonic
#define us_trigger_pin 4
#define us_echo_pin 3
Ultrasonic u_s(us_trigger_pin, us_echo_pin);

// Temperature
#define temp 8
OneWire temp_one_wire(temp);  
DallasTemperature temp_sensor(&temp_one_wire); 
float temperature_value;

// PH
float phValue;
int16_t calibration = 20;

// tds
float tds;
float tensao_c;

// reads
int read;
float voltage;


void setup() {
  
  wake_up();
}

void loop() 
{
  start_sleeping();
  sleep_disable();
  wake_up();

  digitalWrite(ACTIVE_PIN, HIGH);
  delay(2000);

  // Temperature
  temp_sensor.requestTemperatures(); 
  temperature_value = temp_sensor.getTempCByIndex(0);

  // Ph
  read = ads.readADC(0);
  voltage = read * voltage_f;
  phValue = -5.70 * voltage + calibration;

  // Turbidity
  read = ads.readADC(1);
  voltage = read * voltage_f;
  ntu = -1120.4*voltage*voltage + 5742.3*voltage - 4352.9;

  // Tds
  read = ads.readADC(2);
  voltage = read * voltage_f;
  tensao_c = voltage / (1.0+0.02*(temperature_value-25.0));
  tds = (133.42*tensao_c*tensao_c*tensao_c - 255.86*tensao_c*tensao_c + 857.39*tensao_c) * 0.5;
  


  digitalWrite(ACTIVE_PIN, LOW);
  delay(500);
  Serial.print(u_s.read(CM));
  Serial.print("cm, ");
  Serial.print(ntu);
  Serial.print("NTU, ");
  Serial.print(temperature_value);
  Serial.print("C, ");
  Serial.print(tds);
  Serial.print("ppm, ");
  Serial.print(phValue);
  Serial.println("ph");
  
  delay(1000);
}

void start_sleeping()
{
  MCUSR = 0; // clear reset flags
  WDTCSR |= bit (WDCE) | bit (WDE); // allow changes, disable reset, enable watchdog interrupt
  WDTCSR = bit (WDIE) |  bit (WDP2) | bit (WDP1); // set interval
  wdt_reset(); // start watchdog timer
  set_sleep_mode (SLEEP_MODE_PWR_DOWN);
  sleep_enable();
  sleep_cpu(); // power down
}

ISR (WDT_vect){
  wdt_disable();
}

void wake_up()
{
  Serial.begin(115200);
  pinMode(ACTIVE_PIN, OUTPUT);
  ads.begin();
  ads.setGain(0);
  voltage_f = ads.toVoltage();
}
