String msg;

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);
}

void loop() {
  if(Serial.available() > 0)
  {
    msg = Serial.readString();
    Serial2.println(msg);
  }

  if(Serial2.available() > 0)
  {
    msg = Serial2.readString();
    Serial.println(msg);
  }
}