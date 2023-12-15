#include "EBYTE.h"

#define M0 4    // D4 on the board (possibly pin 24)
#define M1 2   // D2 on the board (possibly called pin 22)
#define AUX 15   // D15 on the board (possibly called pin 21)
#define RX 19
#define TX 18

String msg;

HardwareSerial SerialLora(1);

EBYTE Transceiver(&SerialLora, M0, M1, AUX);

void setup() {
  Serial.begin(9600);
  SerialLora.begin(9600, SERIAL_8N1, RX, TX, false);

  Serial.println(Transceiver.init());

  Serial.println(Transceiver.GetAirDataRate());
  Serial.println(Transceiver.GetChannel());

  Transceiver.SetAddress(10);
  Transceiver.SetChannel(23);
  Transceiver.SaveParameters(TEMPORARY);
  Transceiver.PrintParameters();
}

void loop() {
  if(SerialLora.available() > 0)
  {
      String msg = SerialLora.readString();
      Serial.println(msg);
  }
}