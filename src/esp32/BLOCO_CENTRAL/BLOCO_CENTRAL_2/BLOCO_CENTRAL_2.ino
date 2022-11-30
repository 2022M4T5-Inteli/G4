
/*incluindo as bibliotecas Adafruit_AHTX0, Wire, LiquidCrystal
Adafruit_AHTX0 para o sensor de temperatura e umidade
Wire que vai permitir enviar e receber dados por meio da interface I2C em uma rede de sensores
LiquidCrystal_I2C para o display LCD
WiFi essa biblioteca habilita a conexão de rede, tanto redes locais quanto internet, podendo intanciar Servidores, Clientes e enviar ou receber pacotes UDP por meio do WiFi
HTTPClient essa biblioteca fornece uma API para as solicitações HTTP serem criadas e executadas a partir de seu modelo
*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_AHTX0.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* root_ca = \
"-----BEGIN CERTIFICATE-----\n" \
"MIIETjCCAzagAwIBAgISA9otMSuMr7adH8i5RZ50JyWdMA0GCSqGSIb3DQEBCwUA\n" \
"MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\n" \
"EwJSMzAeFw0yMjA5MjQyMzI0MDRaFw0yMjEyMjMyMzI0MDNaMBQxEjAQBgNVBAMM\n" \
"CSouZmx5LmRldjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABEUhlkSYvdPtnf1J\n" \
"w9WVCJ074p6S4LV4w6fcOHKeaUh0/y0zo2SAU3lXBxt988bEd/51bv6GIss2MNJI\n" \
"rTTAsHmjggJFMIICQTAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUH\n" \
"AwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFMt9kWuycE2DOhv2\n" \
"JqWX5AvKHNOwMB8GA1UdIwQYMBaAFBQusxe3WFbLrlAJQOYfr52LFMLGMFUGCCsG\n" \
"AQUFBwEBBEkwRzAhBggrBgEFBQcwAYYVaHR0cDovL3IzLm8ubGVuY3Iub3JnMCIG\n" \
"CCsGAQUFBzAChhZodHRwOi8vcjMuaS5sZW5jci5vcmcvMBQGA1UdEQQNMAuCCSou\n" \
"Zmx5LmRldjBMBgNVHSAERTBDMAgGBmeBDAECATA3BgsrBgEEAYLfEwEBATAoMCYG\n" \
"CCsGAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCCAQUGCisGAQQB\n" \
"1nkCBAIEgfYEgfMA8QB2ACl5vvCeOTkh8FZzn2Old+W+V32cYAr4+U1dJlwlXceE\n" \
"AAABg3IHmrEAAAQDAEcwRQIgRkZwKGLgAp/8z/F/o3WvT1AQzgwKG5CkkcCpbpi7\n" \
"C6cCIQCkUDA8bqzTkyLEiXyaQjLkhpwVsFHk/RtuqV+/RDt18AB3AG9Tdqwx8DEZ\n" \
"2JkApFEV/3cVHBHZAsEAKQaNsgiaN9kTAAABg3IHnAwAAAQDAEgwRgIhALZECaLj\n" \
"tKpW13i1APgtlbYY6i2DdG5ZCpzIpDywptcFAiEAzOk8xeZeXk9bOmMgyQDjehg8\n" \
"0wDCxh6wIlNoIaLwDW8wDQYJKoZIhvcNAQELBQADggEBAEdmPvIgbkMGv+gEDMQ6\n" \
"X5MFdrSKcWp/o+1Xhx1AThhiyZbq908OesJCP8Re49X9QvnJ9s3ArqUqSQBwWxw0\n" \
"+LQAMjhUUUd2eNAk+5wZHVIklJtFeiOxQnNv4UAg/mV9ep1J20W68RgwnwSoOcP5\n" \
"whwShAEKmx9tptYqDLdGZ1J49vYhoeY6Rh5q6TDShz4WBo+syplo/UMijdNMmZDX\n" \
"rB1NbXALs1ic0JcA3cjiL7lETaVhYB//TY4FP5HTuMfCfRWzNSOTZMTdQCsRe66W\n" \
"RCA5VlhCSUywM4HdNQo3ili2w5uNUyPIlH4AEa8xMVxwT+kpXA2nhGWroQcSEYmN\n" \
"cfg=\n" \
"-----END CERTIFICATE-----\n";


//definindo constantes para conexão com wi-fi e db:
const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";
int LED = 8;
const char* serverName = "https://keepgrowing-api.fly.dev:443/medidas/add";
WiFiServer server(80);

//#include <Adafruit_BusIO_Register.h>
//definindo as saídas de cada componente da solução VER SE ESSA PARTE TA CERTA DEFINIR MELHORS
#define SDA_PIN 42
#define SCL_PIN 40
#define RED_RGB 9
#define GREEN_RGB 10
#define BLUE_RGB 11
#define BUZZER 8//Buzzer
#define RED 5//Led vermelho

//contantes com limite de temperatura:

const float tempMin = 28;
const float tempMax = 36;


Adafruit_AHTX0 aht;

//definindo o numero de colunas e linhas do display LCD
int lcdColumns = 16;
int lcdRows = 2;
//definindo o endereço do LCD
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

//variaveis longas para guardadar tempo:
unsigned long lastTime = 0;
unsigned long timerDelay = 6000;


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
  //print o endereço do IP
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
    //caso o wifi esteja conectado:
    if(WiFi.status()==WL_CONNECTED){

      WiFiClientSecure client;
      HTTPClient http;

      client.setCACert(root_ca);
      
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
    //caso o wifi esteja desconectado
    else{
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }

  
  delay(500);

  //definindo se caso a temperatura não esteja entre o intervalo que a estufa precise ligue o led vermelho, caso esteja dentro das condiçoes vai ligar o led verde.
  if (tempMin <= temp.temperature && temp.temperature <= tempMax) {
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
