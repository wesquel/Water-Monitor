#define pin_turbidez A3

int leitura;
float ntu;

void setup() {
  Serial.begin(9600);
  pinMode(pin_turbidez, INPUT);
}

void loop() {
  leitura = analogRead(pin_turbidez);
  ntu = -1120.4*tensao*tensao + 5742.3*tensao - 4352.9;

  Serial.print("NTU = ");
  Serial.println(ntu);
}
