//Definição dos status de temperatura e umidade
#define NORMAL -1
#define LOW_TEMPERATURE_STATUS 0
#define HIGH_TEMP_LEVEL_ONE 1
#define HIGH_TEMP_LEVEL_TWO 2
#define HIGH_TEMP_LEVEL_THREE 3
#define LOW_HUMIDITY_STATUS 4
#define HIGH_HUMIDITY_STATUS 5

//Cria uma classe com as regras das medidas
class MetricRules {
  public: //Define escalas de temperatura e umidade
    float tempMin;
    float tempMax;
    float tempHigh;
    float tempExtreme;
    float minHumidity;
    float maxHumidity;

    //Define quais os valores das escalas de temperatura e umidade a partir de inputs
    MetricRules(float tempMinInput, float tempMaxInput, float tempHighInput, float tempExtremeInput, float minHumidityInput, float maxHumidityInput) {
      tempMin = tempMinInput;
      tempMax = tempMaxInput;
      tempHigh = tempHighInput;
      tempExtreme = tempExtremeInput;
      minHumidity = minHumidityInput;
      maxHumidity = maxHumidityInput;
    }
    int getTemperatureStatus(float temperature) { //Função que retorna qual o status de temperatura, a partir do valor da variável temperature
      if (temperature < tempMin) {
      return LOW_TEMPERATURE_STATUS;
      }

      if (temperature > tempExtreme) {
        return HIGH_TEMP_LEVEL_THREE;
      }

      if (temperature > tempHigh) {
        return HIGH_TEMP_LEVEL_TWO;
      }

      if (temperature > tempMax) {
        return HIGH_TEMP_LEVEL_ONE;
      }

      return NORMAL;
    }

    int getHumidityStatus(float humidity) {//Função que retorna qual o status de umidade, a partir do valor da variável humidity
      if (humidity < minHumidity) {
        return LOW_HUMIDITY_STATUS;
      }

      if (humidity > maxHumidity) {
        return HIGH_HUMIDITY_STATUS;
      }

      return NORMAL;
    }
};