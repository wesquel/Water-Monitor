#define TdsSensorPin A1
#define VREF 5.0 // Tensão do arduino
#define SCOUNT 30 // numero de amostras

int analogBuffer[SCOUNT]; // buffer para média
int analogBufferTemp[SCOUNT]; // buffer temporario

int analogBufferIndex = 0; // indice do buffer
int copyIndex = 0;
float averageVoltage = 0, tdsValue = 0, temperature = 25;


void setup()
{
  Serial.begin(9600);
  pinMode(TdsSensorPin, INPUT);
}
void loop()
{
  static unsigned long analogSampleTimepoint = millis();
  if(millis()-analogSampleTimepoint > 40U) // a cada 40ms lê a entrada analogica
  {
    analogSampleTimepoint = millis();
    analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin); //read the analog value and store into the buffer
    analogBufferIndex++;
    if(analogBufferIndex == SCOUNT)
      analogBufferIndex = 0;
  }
  static unsigned long printTimepoint = millis();

  if(millis()-printTimepoint > 800U)
  {
    printTimepoint = millis();
    for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
      analogBufferTemp[copyIndex]= analogBuffer[copyIndex];

    averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF/ 1024.0; // faz a media dos valores lidos e converte para tensão
    float compensationCoefficient = 1.0+0.02*(temperature-25.0); // para compensar a variação de  temperatura usamos essa formula (1.0+0.02*(temperatura-25.0)), depois dividimos a tensao pelo valor encontrado.
    float compensationVolatge=averageVoltage/compensationCoefficient; // Compensando a variacao de temperatura
    
    tdsValue = (133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
    //Serial.print("voltage:");
    //Serial.print(averageVoltage,2);
    //Serial.print("V ");
    Serial.print("TDS Value:");
    Serial.print(tdsValue,0);
    Serial.println("ppm");
  }
}

int getMedianNum(int bArray[], int iFilterLen)
{
  int bTab[iFilterLen];
  for (byte i = 0; i<iFilterLen; i++)
    bTab[i] = bArray[i];
    
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++)
  {
    for (i = 0; i < iFilterLen - j - 1; i++)
    {
      if (bTab[i] > bTab[i + 1])
      {
      bTemp = bTab[i];
      bTab[i] = bTab[i + 1];
      bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0)
    bTemp = bTab[(iFilterLen - 1) / 2];
  else
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  return bTemp;
}
