const statusTypes = {
  NORMAL: -1,
  LOW_TEMPERATURE_STATUS: 0,
  HIGH_TEMP_LEVEL_ONE: 1,
  HIGH_TEMP_LEVEL_TWO: 2,
  HIGH_TEMP_LEVEL_THREE: 3,
  LOW_HUMIDITY_STATUS: 4,
  HIGH_HUMIDITY_STATUS: 5,
};

class MetricValidator {
  constructor(temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
  }

  verifyTemp(minTemp, maxTempList) {
    if (this.temperature < minTemp) {
      return statusTypes.LOW_TEMPERATURE_STATUS;
    }

    if (this.temperature > maxTempList[2]) {
      return statusTypes.HIGH_TEMP_LEVEL_THREE;
    }

    if (this.temperature > maxTempList[1]) {
      return statusTypes.HIGH_TEMP_LEVEL_TWO;
    }

    if (this.temperature > maxTempList[0]) {
      return statusTypes.HIGH_TEMP_LEVEL_ONE;
    }

    return statusTypes.NORMAL;
  }

  verifyHumidity(minHumidity, maxHumidity) {
    if (this.humidity < minHumidity) {
      return statusTypes.LOW_HUMIDITY_STATUS;
    }

    if (this.humidity > maxHumidity) {
      return statusTypes.HIGH_HUMIDITY_STATUS;
    }

    return statusTypes.NORMAL;
  }

  verifyRules() {
    const notificationStatusList = [];

    const temperatureStatus = this.verifyTemp(26.6, [37.08, 37.8, 39.6]);
    const humidityStatus = this.verifyHumidity(66.5, 90.25);

    notificationStatusList.push(temperatureStatus, humidityStatus);
    return notificationStatusList;
  }
}

module.exports = {
  MetricValidator,
};
