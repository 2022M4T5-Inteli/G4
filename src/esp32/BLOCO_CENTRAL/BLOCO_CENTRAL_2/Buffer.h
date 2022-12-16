//Inclui biblioteca necessária para o buffer
#include <sys/types.h>

//Cria uma classe para o armazenamento das medidas
class MetricsStorage {
private:
  ApoloError logger;

  //Método que salva a temperatura, a umidade, o status de temperatura, o status de umidade e o horário da medição no ESP32
  void saveToBuffer(int entryCount, float temperature, float humidity, int tempStatus, int humStatus, String datetime) {
    entryCount++;
    String bufferEntries = bufferPreference.getString("bufferEntries", "");
    bufferEntries = bufferEntries + String(temperature) + "," + String(humidity) + "," + String(tempStatus) + "," + String(humStatus) + "," + "\"" + datetime + "\"\n";
    bufferPreference.putString("bufferEntries", bufferEntries);
    bufferPreference.putString("bufferColumns", columns + "\n");
    bufferPreference.putUInt("entryCounter", entryCount);
  }

public:
  int maxBufferEntries;
  String columns;
  Preferences bufferPreference;

  //Método que define qual o máximo de entradas e quais são as colunas no buffer
  MetricsStorage(Preferences preference, int maxEntries, String columnsName) {
    maxBufferEntries = maxEntries;
    columns = columnsName;
    bufferPreference = preference;
  }

  //Método responsável por limpar todo o buffer
  void clearBuffer() {
    bufferPreference.putUInt("entryCounter", 0);
    bufferPreference.putString("bufferEntries", "");
  }

  //Método responsável por retornar um csv com os dados salvos
  String getMetricsCsv() {
    String dataFormatted = bufferPreference.getString("bufferColumns", "") + bufferPreference.getString("bufferEntries");
    return dataFormatted;
  }

  //Método responsável por retornar todas as entradas do buffer
  void logBuffer() {
    logger.logMessage(String(bufferPreference.getUInt("entryCounter", 0)),-1);
    logger.logMessage(bufferPreference.getString("bufferEntries", ""), -1);
  }

  //Método responsável pelo processamento das entradas, verificando se o buffer está cheio ou não
  void processMetric(float temperature, float humidity, int tempStatus, int humStatus, String datetime) {
    int entryCount = bufferPreference.getUInt("entryCounter", -1);
    if(entryCount < 0) {
      logger.logMessage("Nenhuma contagem de entradas encontradas no buffer.\nResetando todas as informações por segurança!", -1);
      clearBuffer();
      entryCount++;
    }
    
    logger.logMessage(String(entryCount),-1);
    if(entryCount >= maxBufferEntries) {
      logger.logMessage("Buffer Cheio! Nenhuma informação de temperature e/ou umidade será guardada.", 0);
    } else {
      saveToBuffer(entryCount, temperature, humidity, tempStatus, humStatus, datetime);
    }

    logBuffer();
  }
};