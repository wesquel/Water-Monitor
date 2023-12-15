#define pin_turbidez A0

int leitura;
float tensao;
float ntu;

void setup() {
  Serial.begin(9600);
  pinMode(pin_turbidez, INPUT);
}

void loop() {
  leitura = analogRead(pin_turbidez);
  tensao = leitura*5.0/1024;
  ntu = -1120.4*tensao*tensao + 5742.3*tensao - 4352.9;
  
  Serial.print("NTU = ");
  Serial.println(ntu);
  delay(500);
}
