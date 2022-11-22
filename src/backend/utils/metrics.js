// Define um dicionário comm todas as faixas de status para temperatura
const statusTypes = {
  NORMAL: -1,
  LOW_TEMPERATURE_STATUS: 0,
  HIGH_TEMP_LEVEL_ONE: 1,
  HIGH_TEMP_LEVEL_TWO: 2,
  HIGH_TEMP_LEVEL_THREE: 3,
  LOW_HUMIDITY_STATUS: 4,
  HIGH_HUMIDITY_STATUS: 5,
};


// Classe responsável por receber métricas de temperatura e umidade
// e gerar um status correspondente 
class MetricValidator {

  // define as entradas da classe (structure)
  constructor(temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
  }


  // função interna responsável por gerar um status para a
  // métrica de temperatura
  verifyTemp(minTemp, maxTempList) {
    // de acordo com as condições, retorna
    // um status correspondente no dicionário de status
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

  // função interna responsável por gerar um status para a
  // métrica de umidade
  verifyHumidity(minHumidity, maxHumidity) {
    // de acordo com as condições, retorna
    // um status correspondente no dicionário de status
    if (this.humidity < minHumidity) {
      return statusTypes.LOW_HUMIDITY_STATUS;
    }

    if (this.humidity > maxHumidity) {
      return statusTypes.HIGH_HUMIDITY_STATUS;
    }

    return statusTypes.NORMAL;
  }

  // método responsável por aplicar regras de temperatura e umidade, e retornar
  // os seus status correspondentes
  verifyRules() {
    const notificationStatusList = [];

    const temperatureStatus = this.verifyTemp(26.6, [37.08, 37.8, 39.6]);
    const humidityStatus = this.verifyHumidity(66.5, 90.25);

    // retorna uma lista de status para uma métrica
    // os quais serão convertidos em notificações posteriormente
    notificationStatusList.push(temperatureStatus, humidityStatus);
    return notificationStatusList;
  }
}

// exporta a classe para ser utilizada em outros arquivos do projeto
module.exports = {
  MetricValidator,
};
