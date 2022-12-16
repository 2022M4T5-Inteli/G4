#define NORMAL -1
#define LOW_TEMPERATURE_STATUS 0
#define HIGH_TEMP_LEVEL_ONE 1
#define HIGH_TEMP_LEVEL_TWO 2
#define HIGH_TEMP_LEVEL_THREE 3
#define LOW_HUMIDITY_STATUS 4
#define HIGH_HUMIDITY_STATUS 5

class MetricRules {
  public:
    float tempMin;
    float tempMax;
    float tempHigh;
    float tempExtreme;
    float minHumidity;
    float maxHumidity;

    MetricRules(float tempMinInput, float tempMaxInput, float tempHighInput, float tempExtremeInput, float minHumidityInput, float maxHumidityInput) {
      tempMin = tempMinInput;
      tempMax = tempMaxInput;
      tempHigh = tempHighInput;
      tempExtreme = tempExtremeInput;
      minHumidity = minHumidityInput;
      maxHumidity = maxHumidityInput;
    }
    int getTemperatureStatus(float temperature) {
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

    int getHumidityStatus(float humidity) {
      if (humidity < minHumidity) {
        return LOW_HUMIDITY_STATUS;
      }

      if (humidity > maxHumidity) {
        return HIGH_HUMIDITY_STATUS;
      }

      return NORMAL;
    }
};