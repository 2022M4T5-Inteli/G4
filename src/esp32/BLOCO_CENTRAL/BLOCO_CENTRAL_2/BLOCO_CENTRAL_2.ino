
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

//incluindo bibliotecas para comunicação com o servidor remoto
#include <WiFiClientSecure.h>
#include <WiFi.h>

// Biblioteca para registro de tempo no ESP32
#include "time.h"

// Biblioteca para serialização de string para JSON
#include <ArduinoJson.h>

// Biblioteca para salvar e modificar configurações
#include <Preferences.h>

// Bibliotecas para webserver
#include <Uri.h>
#include <WebServer.h>


// Certificado para comunicação HTTPS
const char* root_ca= \
"-----BEGIN CERTIFICATE-----\n" \
"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\n" \
"-----END CERTIFICATE-----\n";



// Servidor remoto
const char* serverName = "https://keepgrowing-api.fly.dev";

// Servidor local
WebServer server(80);

//definido para guardar o id do dispositivo
int dispositiveId;

// Variável para controle de estado de conexão wifi
bool connected = false;

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


// Definição da estrutura base para serialização JSON
StaticJsonDocument<250> jsonDocument;
char buffer[250];



// Variáveis para registro de tempo
const char* ntpServer1 = "pool.ntp.org";
const char* ntpServer2 = "time.nist.gov";
const long  gmtOffset_sec = -10800;
const int   daylightOffset_sec = 0;
char formattedTime[20];

// Instanciação de classes
// WiFi
WiFiClientSecure client;
HTTPClient http;

// preferências
Preferences preferences;



// Funções Auxiliares -------------------------------------------------------------

void saveWifiCredentials(String client_ssid, String client_password) {
  preferences.putString("client_ssid", client_ssid);      
  preferences.putString("client_password", client_password);
  preferences.putBool("wifi-configured", true);
}


void connectWifi(const char* ssid,const char* password) {
  int tryAttempts = 0;
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  // attempt to connect to Wifi network:
  while ((WiFi.status() != WL_CONNECTED) && (tryAttempts < 20)) {
    Serial.print(".");
    // wait 1 second for re-trying
    delay(1000);
    tryAttempts++;
    Serial.print("[x] Falha ao conectar ao wifi. Tentativa ");
    Serial.println(tryAttempts);
  }

  if(WiFi.status() != WL_CONNECTED) {
    Serial.print("[x] Não foi possível conectar à rede definida. Total de tentativas:");
    Serial.println(tryAttempts);    
  } else {
  Serial.print("Conectado à ");
  Serial.println(ssid);
  
  Serial.print("Com o IP:");
  Serial.println(WiFi.localIP());
  connected = true;
  }

}

void createWifiAp(const char* ap_ssid, const char* ap_password) {
  Serial.println("\n[+] Gerando ponto de acesso para configurações!");
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP(ap_ssid, ap_password);
  delay(100);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("\nPonto gerado! Ip do ponto de acesso:");
  Serial.println(IP);
}


void restartDevice() {

}

int makePostRequest(String serverAddress, String payload) {
  http.begin(client,serverAddress);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);
  http.end();
  return httpResponseCode;
}

void updateLocalTime()
{
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("No time available (yet)");
    return;
  }
  strftime(formattedTime,20, "%Y-%m-%dT%H:%M:%SZ", &timeinfo);  
}

void sendMetrics(float temperature, float humidity) {
  String payload = "{\"dispositivoId\": \"" + String(dispositiveId) + "\", \"temperatura\":"+ String(temperature) +",\"umidade\":"+ String(humidity) + ",\"datetime\": \"" + formattedTime +".0Z\"}";
  Serial.println("[+] Enviando Métricas ao servidor!");
  Serial.println(payload);
  makePostRequest(String(serverName) + "/medidas/add", payload);
  Serial.println("[+] Requisição efetuada!");
}

//------------------------------------------

// Funções do WebServer

void setupHttp(const char* ca_cert) {
  client.setCACert(ca_cert);
}

void postWifiCredentials() {
  if (server.hasArg("plain") == false) {
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  
  String wifi_ssid = jsonDocument["wifi_ssid"];
  String wifi_password = jsonDocument["wifi_password"];
  saveWifiCredentials(wifi_ssid, wifi_password);
  server.send(200, "application/json", "{\"message\":\"Sucesso! O ESP32 Será Reiniciado.\"}");
  Serial.println("[+] Credenciais de Wifi alteradas com sucesso!");
  Serial.println(("[i] Reiniciando em 3s!"));
  delay(3000);
  ESP.restart();
}

void postResetHandler() {
  preferences.clear();
  server.send(200, "application/json", "{\"message\":\"Sucesso! O ESP32 Será Reiniciado.\"}");
  Serial.println("[+] Configurações locais resetadas!");
  Serial.println(("[i] Reiniciando em 3s!"));
  delay(3000);
  ESP.restart();
}

void getDispositiveInfo() {
  String jsonData = "{\"message\":\"test\"}";
  Serial.println("Called function!!");
  server.send(200, "application/json", jsonData);
}

void routing_setup() {
  Serial.println("Routing Setup!");
  server.on("/info", getDispositiveInfo);
  server.on("/wifi-update", postWifiCredentials);
  server.on("/reset", postResetHandler);
  server.begin();
}

//--------------------------------------------


// Funções de configuração de preferências

void initPreferencesReadWrite() {
  preferences.begin("settings", false);  
}

void registerDispositiveId(uint32_t id) {
  preferences.putUInt("dispositiveId", id);
  preferences.putBool("registered", true);
}

bool registerDispositive(String mac, String nome) {
  String payload = "{\"mac\":\"" + mac +"\",\"nome\": \"" + nome +"\"}";
  int tryCount = 0;
  int responseCode;

  while(tryCount < 3) {
    Serial.println("\n[!] Enviando Requisição de registro.\n");
    responseCode = makePostRequest(String(serverName)  + "/dispositivos/add", payload);
    if(responseCode == 200){
        String body = http.getString();
        deserializeJson(jsonDocument, body);
        int registeredId = jsonDocument["data"]["id"];
        registerDispositiveId(registeredId);

        Serial.println("\n[+] Dispositivo Registrado com sucesso!");
        Serial.print("\n[+] Id Dispositivo:");
        Serial.println(registeredId);
        return true;
    } else {
      Serial.println("\n[!] Falha ao registrar dispositivo! Tentativa " + String(tryCount));
      Serial.println("\n[!] Tentando novamente.\n");
      delay(2000);
      tryCount++;
    }  
  }
  Serial.println("\n[x] Não foi possível registrar o dispositivo.\n");
  return false;
}


// ---------------------------------------------

void runHandler() {
  initPreferencesReadWrite();

  createWifiAp("teste-esp32-esp", "password123");
  if(preferences.getBool("wifi-configured") == true) {
    connectWifi(preferences.getString("client_ssid").c_str(), preferences.getString("client_password").c_str());
    setupHttp(root_ca);

    if(preferences.getBool("registered") == false) {
      String mac = WiFi.macAddress();
      bool isRegistred = registerDispositive(mac, preferences.getString("dispositiveName", "sem-nome-" + mac));
    }

  }

  dispositiveId = preferences.getUInt("dispositiveId", 0);

  routing_setup();
}


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

  Serial.println("\n\n[i] Iniciando Setup do dispositivo.\n\n");
  runHandler();
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);


  delay(500);
}

void loop(){
  server.handleClient();
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

      delay(100);
      updateLocalTime();
      sendMetrics(temperatura, umidade);
      digitalWrite(RED, LOW);
    }
    //caso o wifi esteja desconectado
    else{
      Serial.println("[!] WiFi Disconectado!!");
      digitalWrite(RED, HIGH);
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
