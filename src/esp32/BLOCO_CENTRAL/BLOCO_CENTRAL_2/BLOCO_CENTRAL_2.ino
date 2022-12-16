
// Incluindo classe para implementação do fluxo de erro
#include "Apolo.h"

// Inlcuindo tab com funções para conexão wifi
#include "Connection.h"

// Incluindo tab com funções para o display LCD
#include "Display.h"

/*incluindo as bibliotecas Adafruit_AHTX0,
Adafruit_AHTX0 para o sensor de temperatura e umidade
HTTPClient essa biblioteca fornece uma API para as solicitações HTTP serem criadas e executadas a partir de seu modelo
*/

#include <Adafruit_AHTX0.h>
#include <HTTPClient.h>


// Biblioteca para registro de tempo no ESP32
#include "time.h"

// Biblioteca para serialização de string para JSON
#include "AsyncJson.h"
#include <ArduinoJson.h>

// Biblioteca para salvar e modificar configurações
#include <Preferences.h>


// Classe para salvar dados de temperatura e umidade localmente
#include "Buffer.h"

// Biblioteca para controle de Buzzer
#include "BuzzerController.h"

// Biblioteca para controle de regras de temperatura e umidade
#include "Rules.h"

// Bibliotecas para webserver
#include <Uri.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>


#include "Requests.h"


// Logger de erros
ApoloError logger;

// Servidor local
AsyncWebServer server(80);

//definido para guardar o id do dispositivo
int dispositiveId;

//#include <Adafruit_BusIO_Register.h>
//definindo as saídas de cada componente da solução VER SE ESSA PARTE TA CERTA DEFINIR MELHORS
#define SDA_PIN 42
#define SCL_PIN 40
#define RED_RGB 9
#define GREEN_RGB 10
#define BLUE_RGB 11
#define BUZZER 8//Buzzer
#define RED 5//Led vermelho

// Status internos de temperatura e umidade
#define LOW_TEMPERATURE_STATUS 0
#define HIGH_TEMP_LEVEL_ONE 1
#define HIGH_TEMP_LEVEL_TWO 2
#define HIGH_TEMP_LEVEL_THREE 3
#define LOW_HUMIDITY_STATUS 4
#define HIGH_HUMIDITY_STATUS 5

Adafruit_AHTX0 aht;


//variaveis longas para guardadar tempo:
unsigned long lastTime = 0;
unsigned long timerDelay = 6000;


// Definição da estrutura base para serialização JSON
StaticJsonDocument<250> jsonDocument;
char buffer[250];

char formattedTime[20];

// Instanciação de classes
// Requisições
ESPRequest esp_request;

// preferências
Preferences preferences;

// Buzzer
BuzzerController Buzzer(BUZZER);
// Variáveis de configuração ------------------------------------------------
// Servidor remoto
String serverName = "https://keepgrowing-api.fly.dev";

// Registro de tempo
String ntpServer1 = "pool.ntp.org";
String ntpServer2 = "time.nist.gov";
const long  gmtOffset_sec = -10800;
const int   daylightOffset_sec = 0;

//contantes com limite de temperatura e umidade

float tempMin = 28;
float tempMax = 37;
float tempHigh = 37.8;
float tempExtreme = 39;
float minHumidity = 66.5;
float maxHumidity = 90.25;

// Registro de informações locais
const int MAX_BUFFER_ENTRIES = 1440;
String COLUMN_NAMES = "temp,hum,temp_status,hum_status,date";

MetricsStorage localBuffer(preferences, MAX_BUFFER_ENTRIES, COLUMN_NAMES);


// Regra de Métricas
MetricRules metricRules(tempMin, tempMax, tempHigh, tempExtreme, minHumidity, maxHumidity);

// Funções Auxiliares -------------------------------------------------------------

void saveWifiCredentials(String client_ssid, String client_password) {
  preferences.putString("client_ssid", client_ssid);      
  preferences.putString("client_password", client_password);
  preferences.putBool("wifi-configured", true);
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

void sendMetrics(float temperature, float humidity, bool offline) {
  int tempStatus = metricRules.getTemperatureStatus(temperature);
  int humStatus = metricRules.getHumidityStatus(humidity);
  
  if(preferences.getBool("registered") == true){
    if(offline) {
      logger.logMessage("Salvando dados localmente!", 2);
      localBuffer.processMetric(temperature, humidity, tempStatus, humStatus, formattedTime);    
    } else {
      int statusCode;
      String payload = "{\"dispositivoId\": \"" + String(dispositiveId) + "\", \"temperatura\":"+ String(temperature) +",\"umidade\":"+ String(humidity) + ",\"temperaturaStatus\":" + String(tempStatus) + ", \"umidadeStatus\":" + String(humStatus) + ", \"datetime\": \"" + formattedTime +".0Z\"}";
      Serial.println("[+] Enviando Métricas ao servidor!");
      Serial.println(payload);
      statusCode = esp_request.makePostRequest(String(serverName) + "/medidas/add", payload);
      
      if(statusCode != 200) {
        logger.logMessage("C01U - Erro ao se comunicar com o servidor remoto!", 0);
        logger.displayMessage("C01U", lcd);
      }
      logger.logMessage("Requisição efetuada!", -1);
    }
  } else {
    logger.logMessage("Dispositivo não registrado!", 0);
  }
}


//------------------------------------------

// Funções de configuração de preferências
void initPreferencesReadWrite() {
  preferences.begin("settings", false);
  localBuffer.bufferPreference = preferences;
}

void loadSettings() {
  serverName = preferences.getString("serverName",serverName);
  ntpServer1 = preferences.getString("ntpServer1", ntpServer1);
  ntpServer2 = preferences.getString("ntpServer2", ntpServer2);

  tempMin = preferences.getFloat("tempMin",28);
  tempMax = preferences.getFloat("tempMax",37);
  tempHigh = preferences.getFloat("tempHigh", 37.8);
  tempExtreme = preferences.getFloat("tempExtreme",39.6);

  minHumidity = preferences.getFloat("minHumidity",66.5);  
  maxHumidity = preferences.getFloat("maxHumidity",90.25); 

  metricRules.tempMin = tempMin;
  metricRules.tempMax = tempMax;
  metricRules.tempHigh = tempHigh;
  metricRules.tempExtreme = tempExtreme;

  metricRules.minHumidity = minHumidity;
  metricRules.maxHumidity = maxHumidity;
}

void updateSettings(String newServerName, String newNtpServer1, String newNtpServer2, float newTempMin, float newTempMax, float newTempHigh, float newTempExtreme, float newMinHumidity, float newMaxHumidity) {
  preferences.putString("serverName",newServerName);
  preferences.putString("ntpServer1", newNtpServer1);
  preferences.putString("ntpServer2",newNtpServer2);

  preferences.putFloat("tempMin", newTempMin);
  preferences.putFloat("tempMax", newTempMax);
  preferences.putFloat("tempHigh", newTempHigh);
  preferences.putFloat("tempExtreme", newTempExtreme);
  preferences.putFloat("minHumidity", newMinHumidity);
  preferences.putFloat("maxHumidity", newMaxHumidity);

  loadSettings();
}

// Função que salva o ID do dispositivo localmente
void registerDispositiveId(uint32_t id) {
  preferences.putUInt("dispositiveId", id);
  preferences.putBool("registered", true);
}

// Função que registra o dispositivo remotamente
// e guarda o ID recebido localmente
bool registerDispositive(String mac, String nome) {
  String payload = "{\"mac\":\"" + mac +"\",\"nome\": \"" + nome +"\"}";
  int tryCount = 0;
  int responseCode;

  while(tryCount < 3) {
    Serial.println("\n[!] Enviando Requisição de registro.\n");
    responseCode = esp_request.makePostRequest(serverName  + "/dispositivos/add", payload);
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
// ----------------------------------------------------


// Funções do WebServer

// Função utilizada para retornar "OK" para
// os métodos OPTIONS das requisições CORS
void sendCrossOriginHeader(AsyncWebServerRequest *request) {
  request->send(204);
}

// Função que cuida da requisição POST para recebimento
// das credenciais de WiFi
void postWifiCredentials(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  deserializeJson(jsonDocument, data);
  
  String wifi_ssid = jsonDocument["wifi_ssid"];
  String wifi_password = jsonDocument["wifi_password"];
  saveWifiCredentials(wifi_ssid, wifi_password);
  request->send(200, "application/json", "{\"message\":\"Sucesso! O ESP32 Será Reiniciado.\"}");  
  Serial.println("[+] Credenciais de Wifi alteradas com sucesso!");
  Serial.println(("[i] Reiniciando!"));
  delay(2000);
  ESP.restart();
}

void postSettings(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  
  deserializeJson(jsonDocument, data);
  String newServerName = jsonDocument["serverName"];
  String newNtpServer1 = jsonDocument["ntpServer1"];
  String newNtpServer2 = jsonDocument["ntpServer2"];
  float newTempMin = float(jsonDocument["tempMin"]);
  float newTempMax = float(jsonDocument["tempMax"]);
  float newTempHigh = float(jsonDocument["tempHigh"]);
  float newTempExtreme = float(jsonDocument["tempExtreme"]);
  float newMinHumidity = float(jsonDocument["minHumidity"]);
  float newMaxHumidity = float(jsonDocument["maxHumidity"]);

  updateSettings(newServerName, newNtpServer1, newNtpServer2, newTempMin, newTempMax, newTempHigh, newTempExtreme, newMinHumidity, newMaxHumidity);
  request-> send(200, "application/json", "{\"message\":\"Sucesso! Configurações alteradas. Reiniciando Dispositivo.\"}");  
  Serial.println("[+] Configurações do dispositivo alteradas!");
  delay(2000);
  ESP.restart();
}

// Função que cuida da requisição POST para reiniciar o dispositivo
void postResetHandler(AsyncWebServerRequest *request) {
  preferences.clear();
  request->send(200, "application/json", "{\"message\":\"Sucesso! O ESP32 Será Reiniciado.\"}");
  Serial.println("[+] Configurações locais resetadas!");
  Serial.println(("[i] Reiniciando!"));
  delay(2000);
  ESP.restart();
}

void postClearBuffer(AsyncWebServerRequest *request) {
  localBuffer.clearBuffer();
  request->send(200, "application/json", "{\"message\":\"Dados do buffer resetados!\"}");
}

// Função que cuida da requisição GET para testar a saúde servidor do dispositivo
void getDispositiveInfo(AsyncWebServerRequest *request) {
  bool connected = isWifiConnected();
  String mac = WiFi.macAddress();
  IPAddress localIP = WiFi.softAPIP();
  IPAddress networkIp = WiFi.localIP();
  String jsonData = "{\"data\":{\"dispositiveId\":\"" + String(dispositiveId) + "\",\"connected\":" + String(connected) + ",\"mac\":\"" + mac + "\", \"apIp\":\"" + localIP.toString() + "\", \"networkIp\":\"" + networkIp.toString() + "\"}}";
  Serial.println("Called function!!");
  request->send(200, "application/json", jsonData);
}

void getDispositiveSettings(AsyncWebServerRequest *request) {
  String jsonData = "{\"settings\":{\"serverName\":\"" + serverName + "\",\"ntpServer1\":\"" + ntpServer1 + "\",\"ntpServer2\":\"" + ntpServer2 + "\",\"tempMin\":" + tempMin + ",\"tempMax\":" + tempMax + ",\"tempHigh\":" + tempHigh + ",\"tempExtreme\":" + tempExtreme + ",\"minHumidity\":" + minHumidity + ",\"maxHumidity\":" + maxHumidity + "}}";
  request->send(200, "application/json", jsonData);
}

void getLocalData(AsyncWebServerRequest *request) {
  String body = localBuffer.getMetricsCsv();
  request->send(200, "text/csv", body);
}

// Função que assimila as rotas do servidor com suas funções representantes
void routing_setup() {
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

  Serial.println("Routing Setup!");
  server.on("/info", HTTP_GET, getDispositiveInfo);
  server.on("/settings", HTTP_GET, getDispositiveSettings);
  server.on("/info", HTTP_OPTIONS, sendCrossOriginHeader);
  server.on("/wifi-update", HTTP_POST, [](AsyncWebServerRequest * request){}, NULL, postWifiCredentials);
  server.on("/wifi-update", HTTP_OPTIONS, sendCrossOriginHeader);
  server.on("/settings", HTTP_POST, [](AsyncWebServerRequest * request){}, NULL, postSettings);
  server.on("/settings", HTTP_OPTIONS, sendCrossOriginHeader);
  server.on("/reset",HTTP_POST, postResetHandler);
  server.on("/reset", HTTP_OPTIONS, sendCrossOriginHeader);
  server.on("/info", HTTP_GET, getDispositiveInfo);
  server.on("/extract", HTTP_GET, getLocalData);
  server.on("/extract", HTTP_OPTIONS, sendCrossOriginHeader);
  server.on("/clearBuffer", HTTP_POST, postClearBuffer);
  server.on("/clearBuffer", HTTP_OPTIONS, sendCrossOriginHeader);
  server.begin();
}

//--------------------------------------------

// Função que executa uma série de inicializações necessárias
// para controle de preferências e configuração WiFi
void runHandler() {
  initPreferencesReadWrite();
  loadSettings();

  createWifiAp("teste-esp32-esp", "password123");
  if(preferences.getBool("wifi-configured") == true) {
    connectWifi(preferences.getString("client_ssid").c_str(), preferences.getString("client_password").c_str());
    esp_request.setupHttp();

    if(preferences.getBool("registered") == false) {
      String mac = WiFi.macAddress();
      logger.displayMessage("Registrando...", lcd);
      bool isRegistred = registerDispositive(mac, preferences.getString("dispositiveName", "sem-nome-" + mac));
    }

  }

  dispositiveId = preferences.getUInt("dispositiveId", 0);

  routing_setup();
}

// Função para checar por erros na medição de temperatura e umidade
void checkSensorIntegrity(float temperatura, float umidade) {
  if(temperatura == NULL || temperatura == 0.0 || umidade == NULL || umidade == 0.0) {
    logger.logMessage("H00U - Dados do sensor inválidos! Temperatura e/ou umidade nulos.", 0);
    logger.displayMessage("H00U", lcd);
  }
}

void setup(){
  Serial.begin(115200);

  Buzzer.playInicializationSound();

  //setup dos leds
  pinMode(RED_RGB, OUTPUT);
  pinMode(GREEN_RGB, OUTPUT);
  pinMode(BLUE_RGB, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(RED, OUTPUT);  
  //setup dos pins SDA e SCL
  setupLCD(SDA_PIN, SCL_PIN);
  if (! aht.begin()) {
     Serial.println("Could not find AHT? Check wiring");
     while (1) delay(10);
   }
   Serial.println("AHT10 or AHT20 found");

  Serial.println("\n\n[i] Iniciando Setup do dispositivo.\n\n");
  runHandler();
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1.c_str(), ntpServer2.c_str());


  Buzzer.playSuccessSound();

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
  printLCD("Umidade: " + String(umidade));
  
  delay(500);
 
  //definindo as informações que vão passar na segunda linha do LCD
  setCursorLCD(0,1);
  printLCD("Temperatura: " + String(temperatura));

  //passando valores via wifi
  if ((millis() - lastTime) > timerDelay){
    //verifica status da conexão
    //caso o wifi esteja conectado:
    if(isWifiConnected()){
      delay(100);
      updateLocalTime();
      sendMetrics(temperatura, umidade, false);
      digitalWrite(RED, LOW);
    }
    //caso o wifi esteja desconectado
    else{
      sendMetrics(temperatura, umidade, true);
      logger.logMessage("C00U - Wifi desconectado!", 0);
      logger.displayMessage("C00U", lcd);
      digitalWrite(RED, HIGH);
      WiFi.reconnect();
    }
    lastTime = millis();
  }

  
  delay(500);
  // checa a integridade dos dados do sensor
  checkSensorIntegrity(temperatura, umidade);

  //definindo se caso a temperatura não esteja entre o intervalo que a estufa precise ligue o led vermelho, caso esteja dentro das condiçoes vai ligar o led verde.
  if (tempMin <= temp.temperature && temp.temperature <= tempMax || tempMin > temp.temperature ) {
    digitalWrite(RED_RGB, LOW);
    digitalWrite(GREEN_RGB, HIGH);
    digitalWrite(BLUE_RGB, LOW);
    delay(500);
  }
  
  else{
    digitalWrite(RED_RGB, HIGH);
    digitalWrite(GREEN_RGB, LOW);
    digitalWrite(BLUE_RGB, LOW);
    if(preferences.getBool("registered") == true) {
      Buzzer.playAlert();
    }
    delay(500);
  }
  delay(1000);
}
