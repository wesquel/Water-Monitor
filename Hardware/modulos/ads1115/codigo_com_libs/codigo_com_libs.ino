#include "ADS1X15.h"

ADS1115 ads(0x48);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  ads.begin();
}

void loop() {
  ads.setGain(0);

  int16_t val_0 = ads.readADC(0);
  int16_t val_1 = ads.readADC(1);
  int16_t val_2 = ads.readADC(2);

  float f = ads.toVoltage();

  Serial.println("Analogs: ");
  Serial.println(val_0);
  Serial.println(val_1);
  Serial.println(val_2);

  Serial.println(val_0 * f);
  Serial.println();
  delay(1000);
}
