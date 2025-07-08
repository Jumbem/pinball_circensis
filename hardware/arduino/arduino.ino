#include <Wire.h>

#define SLAVE_ADDRESS 0x10

byte sensors[10];

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
  Wire.write(sensors, 10);

  // Clear sensor data
  for (int i = 0; i < 10; i++)
  {
    sensors[i] = 0;
  }
}

void setup()
{
  Serial.begin(9600);

  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.println("I2C Slave Ready");
}

void simularSensores()
{
  char hexCar[2];

  for (int i = 0; i < 10; i++)
  {
    sensors[i] = random(0, 2);
    sprintf(hexCar, "%02X", sensors[i]);
    Serial.print(hexCar);
  }
  Serial.println("");
}

void loop()
{
  simularSensores();
  delay(100);
}
