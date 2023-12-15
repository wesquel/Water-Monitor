#include <avr/wdt.h>
#include <avr/interrupt.h>
#include <avr/sleep.h>
#include <avr/power.h>

#include <Ultrasonic.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ADS1X15.h>
#include <SoftwareSerial.h>
#include "EBYTE.h"

#define ACTIVE_PIN 7
#define temp 8
#define us_trigger_pin 6
#define us_echo_pin 5
#define M0 12
#define M1 11
#define AUX 4
#define RX 3
#define TX 2

// Lora
SoftwareSerial lora(RX, TX);
EBYTE Transceiver(&lora, M0, M1, AUX);
String msg;

// Ads
ADS1115 ads(0x48);  // scl A5, sda A4
float voltage_f;
float ntu;

// Ultra Sonic
Ultrasonic u_s(us_trigger_pin, us_echo_pin);
int distance;

// Temperature
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

int watch_count = 8;

void setup() {
  
  lora.begin(9600);
  Serial.begin(9600);

  Serial.println(Transceiver.init());

  Serial.println(Transceiver.GetAirDataRate());
  Serial.println(Transceiver.GetChannel());

  Transceiver.SetAddress(10);
  Transceiver.SetChannel(23);
  Transceiver.SaveParameters(TEMPORARY);
  Transceiver.PrintParameters();
  wake_up();
}

void loop() 
{
  delay(4000);
  for(int i = 0; i < watch_count; i++)
  {
    start_sleeping();
  }
  sleep_disable();
  wake_up();

  digitalWrite(ACTIVE_PIN, HIGH);
  delay(2000);

  for(int i = 0; i < 10; i++)
  {
    // Temperature
    temp_sensor.requestTemperatures(); 
    temperature_value += temp_sensor.getTempCByIndex(0);

    // Ph
    read = ads.readADC(0);
    voltage = read * voltage_f;
    phValue += -5.70 * voltage + calibration;

    // Turbidity
    read = ads.readADC(1);
    voltage = read * voltage_f;
    ntu += -1120.4*voltage*voltage + 5742.3*voltage - 4352.9;

    // Tds
    read = ads.readADC(2);
    voltage = read * voltage_f;
    tensao_c = voltage / (1.0+0.02*(temperature_value-25.0));
    tds += (133.42*tensao_c*tensao_c*tensao_c - 255.86*tensao_c*tensao_c + 857.39*tensao_c) * 0.5;
    
    //ultra sonic
    distance += u_s.read(CM);
    delay(100);
  }
  
  temperature_value = temperature_value / 10;
  phValue = phValue / 10;
  ntu = ntu / 10;
  tds = tds / 10;
  distance = distance / 10;

  msg = "{\"MACAddress\": \"00B0D063C226\"";
  msg += ", \"condutividade\": ";
  msg += tds;
  msg += ", \"ph\": ";
  msg += phValue;
  msg += ", \"temperatura\": ";
  msg += temperature_value;
  msg += ", \"turbidez\": ";
  msg += ntu;
  msg += ", \"nivel\": ";
  msg += distance;
  msg += "}";

  lora.print(msg);
  Serial.println(msg);

  digitalWrite(ACTIVE_PIN, LOW);
}

void start_sleeping()
{
  MCUSR = 0; // clear reset flags
  WDTCSR |= bit (WDCE) | bit (WDE); // allow changes, disable reset, enable watchdog interrupt
  WDTCSR = bit (WDIE) |  bit (WDP3) | bit (WDP0); // set interval
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
  pinMode(ACTIVE_PIN, OUTPUT);
  ads.begin();
  ads.setGain(0);
  voltage_f = ads.toVoltage();
}
