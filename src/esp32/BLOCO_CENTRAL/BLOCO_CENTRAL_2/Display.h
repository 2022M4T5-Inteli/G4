/*  Wire, LiquidCrystal
Wire que vai permitir enviar e receber dados por meio da interface I2C em uma rede de sensores
LiquidCrystal_I2C para o display LCD
*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

//definindo o numero de colunas e linhas do display LCD
int lcdColumns = 16;
int lcdRows = 2;

//definindo o endereço do LCD
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);

void setupLCD(int SDA_PIN, int SCL_PIN){
  Wire.begin(SDA_PIN, SCL_PIN);
  // iniciando o display LCD
  lcd.init();
  //ligando a luz do LCD                      
  lcd.backlight();
}

// função que define a posição do cursor no display LCD
void setCursorLCD(int column, int line) {
  lcd.setCursor(column, line);
}

// função que exibe uma informação no display LCD
void printLCD(String message) {
  lcd.print(message);
}