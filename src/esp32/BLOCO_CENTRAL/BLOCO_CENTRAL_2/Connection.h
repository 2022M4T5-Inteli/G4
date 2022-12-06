// WiFi essa biblioteca habilita a conexão de rede, tanto redes locais quanto internet, podendo intanciar Servidores, Clientes e enviar ou receber pacotes UDP por meio do WiFi
#include <WiFi.h>

// Variável para controle de estado de conexão wifi
bool connected = false;

// Função que conecta o dispositivo à uma rede wifi
void connectWifi(const char* ssid,const char* password) {
  int tryAttempts = 0;
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  // Tentativa de conexão com o wifi
  while ((WiFi.status() != WL_CONNECTED) && (tryAttempts < 20)) {
    Serial.print(".");
    delay(1000);
    tryAttempts++;
    Serial.print("[x] Falha ao conectar ao wifi. Tentativa ");
    Serial.println(tryAttempts);
  }

  // Executado em caso de falha de conexão
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

// Cria um ponto de acesso wifi para configuração geral do ESP
void createWifiAp(const char* ap_ssid, const char* ap_password) {
  Serial.println("\n[+] Gerando ponto de acesso para configurações!");
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP(ap_ssid, ap_password);
  delay(100);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("\nPonto gerado! Ip do ponto de acesso:");
  Serial.println(IP);
}

// Função que checa se o WiFi está conectado
bool isWifiConnected() {
  return WiFi.status() == WL_CONNECTED;
}