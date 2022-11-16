
/*incluindo as bibliotecas Adafruit_AHTX0, Wire, LiquidCrystal
Adafruit_AHTX0 para o sensor de temperatura e umidade
Wire que vai permitir enviar e receber dados por meio da interface I2C em uma rede de sensores
LiquidCrystal_I2C para o display LCD
*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_AHTX0.h>
#include <WiFi.h>
#include <HTTPClient.h>

//definindo constantes para conexão com wi-fi e db:
const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";
int LED = 8;
const char* serverName = "http://10.128.64.132:1234/medidas/add";
WiFiServer server(80);

//#include <Adafruit_BusIO_Register.h>
//definindo as saídas de cada componente da solução VER SE ESSA PARTE TA CERTA DEFINIR MELHORS
#define SDA_PIN 42
#define SCL_PIN 40
#define RED_RGB 9
#define GREEN_RGB 10
#define BLUE_RGB 11
#define BUZZER 8//Buzzer
#define RED 8//Led vermelho

Adafruit_AHTX0 aht;

//definindo o numero de colunas e linhas do display LCD
int lcdColumns = 16;
int lcdRows = 2;
//definindo o endereço do LCD
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

//variaveis longas para guardadar tempo:
unsigned long lastTime = 0;
unsigned long timerDelay = 60000;


void setup(){
  Serial.begin(115200);
  //setup dos leds
  pinMode(RED_RGB, OUTPUT);
  pinMode(GREEN_RGB, OUTPUT);
  pinMode(BLUE_RGB, OUTPUT);
  pinMode(BUZZER, OUTPUT);
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

  //conexão com wifi:
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    break;
  }

  Serial.println("");
  Serial.println("WiFi conectada.");
  Serial.println("Endereço de IP: ");
  Serial.println(WiFi.localIP());

  server.begin();
  delay(500);
}

void loop(){
  //definindo as informações que vão passar na primeira linha do LCD
sensors_event_t humidity, temp;
aht.getEvent(&humidity, &temp);
  lcd.setCursor(0, 0);

  //variaveis que guardam valores captados pelo sensor
  float umidade = humidity.relative_humidity;
  float temperatura = temp.temperature;

  // definindo a mensagem que vai passar
  lcd.print("Umidade: " + String(umidade));
  
  delay(500);
 
  //definindo as informações que vão passar na segunda linha do LCD
  lcd.setCursor(0,1);
  lcd.print("Temperatura: " + String(temperatura));

  //passando valores via wifi
  if ((millis() - lastTime) > timerDelay){
    //verifica status da conexão
    if(WiFi.status()==WL_CONNECTED){

      WiFiClient client;
      HTTPClient http;

      //caminho do servidor
      http.begin(client, serverName);

      //enviando JSON
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("{\"dispositivoId\": \"1\", \"temperatura\":"+ String(temperatura) +",\"umidade\":"+ String(umidade) + ",\"datetime\": \"2022-01-20T12:01:30.543Z\"}");

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      delay(100);  

      //termina request
      http.end();

    }
    else{
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
  /*if (client) {
    Serial.println("New Client.");
    String currentLine = "";
    //while (client.connected()) {
   if (client.available()) {
      char c = client.read();
      Serial.write(c);
      client.println("HTTP/1.1 200 OK"); 
      client.println("Content-type:text/html");
      client.println();
      client.print("tempretura atual:"+String(temperatura));
      client.print("umidade atual:" + String(umidade));
      client.println();  
      }
  }*/
  
  delay(500);

  //definindo se caso a temperatura não esteja entre o intervalo que a estufa precise ligue o led vermelho, caso esteja dentro das condiçoes vai ligar o led verde.
  if (28 <= temp.temperature && temp.temperature <= 36) {
    digitalWrite(RED_RGB, LOW);
    digitalWrite(GREEN_RGB, HIGH);
    digitalWrite(BLUE_RGB, LOW);
    noTone(8);
    delay(500);
  }
  else{
    digitalWrite(RED_RGB, HIGH);
    digitalWrite(GREEN_RGB, LOW);
    digitalWrite(BLUE_RGB, LOW);
    tone(8, 2000);
    delay(500);
  }
  delay(1000);
}
