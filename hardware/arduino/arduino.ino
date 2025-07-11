#include <Wire.h>

#define sensIND1 3
#define SLAVE_ADDRESS 0x10

byte sensores[10];
bool IND1 = true;
int i = 0;
int n = 0;
int b = 0;
bool ds = 1;

void malabaristasLigar()
{
  Serial.println("Malabaristas: ligar");
}

void malabaristasDesligar()
{
  Serial.println("Malabaristas: desligar");
}

void lateralLigar()
{
  Serial.println("Lateral: ligar");
}

void lateralDesligar()
{
  Serial.println("Lateral: desligar");
}

void saidasLigar()
{
  Serial.println("Saídas: ligar");
}

void saidasDesligar()
{
  Serial.println("Saídas: desligar");
}

void rampaLigar()
{
  Serial.println("Rampa: ligar");
}

void rampaDesligar()
{
  Serial.println("Rampa: desligar");
}

void receiveEvent(int howMany)
{
  int receivedData = Wire.read();

  switch (receivedData)
  {
  case 1:
    malabaristasLigar();
    break;
  case 2:
    malabaristasDesligar();
    break;
  case 3:
    lateralLigar();
    break;
  case 4:
    lateralDesligar();
    break;
  case 5:
    saidasLigar();
    break;
  case 6:
    saidasDesligar();
    break;
  case 7:
    rampaLigar();
    break;
  case 8:
    rampaDesligar();
    break;
  }
}

void requestEvent()
{
  Wire.write(sensores, 10);

  // Clear sensor data
  for (int i = 0; i < 10; i++)
  {
    sensores[i] = 0;
  }
}

void setup()
{
  Serial.begin(9600);

  pinMode(sensIND1, INPUT);

  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.println("I2C Slave Ready");
}

byte lerSensorInducao1()
{
  IND1 = digitalRead(sensIND1);
  if ((IND1 == 1) && (ds == 0))
  {
    ds = 1;
  }
  else if ((IND1 == 0) && (ds == 1))
  {
    ds = 0;
    i = i + 1;

    if (i < 3)
    {
      b = 3 - i;
      Serial.print(("Faltam "));
      Serial.println(b);
      Serial.println("para uma volta.");
    }

    if (i == 3)
    {
      Serial.print(F("Volta Completa,"));
      n = n + 1;
      Serial.print(F(" quantidade de voltas: "));
      Serial.println(n);
      i = 0;
    }
  }

  return n;
}

void loop()
{
  sensores[0] = lerSensorInducao1();
  delay(10);
}
