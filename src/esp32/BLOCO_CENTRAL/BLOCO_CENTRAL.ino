/*incluindo as bibliotecas Adafruit_AHTX0, Wire, LiquidCrystal
Adafruit_AHTX0 para o sensor de temperatura e umidade
Wire que vai permitir enviar e receber dados por meio da interface I2C em uma rede de sensores
LiquidCrystal_I2C para o display LCD
*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_AHTX0.h>
//definindo as saídas de cada componente da solução VER SE ESSA PARTE TA CERTA DEFINIR MELHORS
#define SDA_PIN 42
#define SCL_PIN 40
#define RED 11
#define GREEN 15

Adafruit_AHTX0 aht;

//definindo o numero de colunas e linhas do display LCD
int lcdColumns = 16;
int lcdRows = 2;
//definindo o endereço do LCD
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  


void setup(){
  //setup dos leds
  pinMode(GREEN, OUTPUT);
  pinMode(RED, OUTPUT);
  //setup dos pins SDA e SCL
  Wire.begin(SDA_PIN, SCL_PIN);
  if (! aht.begin()) {
     Serial.println("Could not find AHT? Check wiring");
     while (1) delay(10);
   }
   Serial.println("AHT10 or AHT20 found");
  // iniciando o display LCD
  lcd.init();
  //ligando a luz do LCD                      
  lcd.backlight();
}

void loop(){
  //definindo as informações que vão passar na primeira linha do LCD
sensors_event_t humidity, temp;
aht.getEvent(&humidity, &temp);
  lcd.setCursor(0, 0);
  // definindo a mensagem que vai passar
  lcd.print("Umidade: " + String(humidity.relative_humidity));
  
  delay(500);
 
  //definindo as informações que vão passar na segunda linha do LCD
  lcd.setCursor(0,1);
  lcd.print("Temperatura: " + String(temp.temperature));

  //definindo se caso a temperatura não esteja entre o intervalo que a estufa precise ligue o led vermelho, caso esteja dentro das condiçoes vai ligar o led verde.
  if(28>=temp.temperature>=36){
    digitalWrite(RED, LOW);
    digitalWrite(GREEN, HIGH);
    delay(500);
  }
  else{
    digitalWrite(RED, HIGH);
    digitalWrite(GREEN, LOW);
    delay(500);
  }
  delay(1000);
}