#include <SoftwareSerial.h>
#include "EBYTE.h"

#define M0 12
#define M1 11
#define AUX 4
#define RX 3
#define TX 2

SoftwareSerial lora(RX, TX);

EBYTE Transceiver(&lora, M0, M1, AUX);

void setup() {

  Serial.begin(9600);
  lora.begin(9600);
  Serial.println(Transceiver.init());

  Serial.println(Transceiver.GetAirDataRate());
  Serial.println(Transceiver.GetChannel());

  Transceiver.SetAddress(10);
  Transceiver.SetChannel(23);
  Transceiver.SaveParameters(TEMPORARY);
  Transceiver.PrintParameters();
}

String msg;
int cont = 0;
void loop() {
  /*
  if(Serial.available() > 0)
  {
    String input = Serial.readString();
    lora.print(input);
  }
  */
  delay(5000);
  msg = "{sensorPH: 7, temperatura: 30C, sensorCOnt: ";
  msg += cont++;
  msg += "}";
  lora.print(msg);
}
