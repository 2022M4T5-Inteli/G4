#include <sys/types.h>
class MetricsStorage {
private:
  ApoloError logger;

  void saveToBuffer(int entryCount, float temperature, float humidity, String datetime) {
    entryCount++;
    String bufferEntries = bufferPreference.getString("bufferEntries", "");
    bufferEntries = bufferEntries + String(temperature) + "," + String(humidity) + "," + "\"" + datetime + "\"\n";
    bufferPreference.putString("bufferEntries", bufferEntries);
    bufferPreference.putString("bufferColumns", columns + "\n");
    bufferPreference.putUInt("entryCounter", entryCount);
  }

public:
  int maxBufferEntries;
  String columns;
  Preferences bufferPreference;

  MetricsStorage(Preferences preference, int maxEntries, String columnsName) {
    maxBufferEntries = maxEntries;
    columns = columnsName;
    bufferPreference = preference;
  }

  void clearBuffer() {
    bufferPreference.putUInt("entryCounter", 0);
    bufferPreference.putString("bufferEntries", "");
  }

  String getMetricsCsv() {
    String dataFormatted = bufferPreference.getString("bufferColumns", "") + bufferPreference.getString("bufferEntries");
    return dataFormatted;
  }

  void logBuffer() {
    logger.logMessage(String(bufferPreference.getUInt("entryCounter", 0)),-1);
    logger.logMessage(bufferPreference.getString("bufferEntries", ""), -1);
  }

  void processMetric(float temperature, float humidity, String datetime) {
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
      saveToBuffer(entryCount, temperature, humidity, datetime);
    }

    logBuffer();
  }
};