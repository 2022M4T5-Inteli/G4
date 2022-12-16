// Biblioteca para utilização do tipo LCD
#include <LiquidCrystal_I2C.h>

// Biblioteca para a execução de funções WiFi
#include <WiFi.h>

// Classe controladora da exibição de erros no display e comunicação serial
class ApoloError {
  public:
    // Método que exibe uma mensagem de erro, de acordo com o nível de severidade
    // na porta serial
    void logMessage(String message, int level) {
      String levelMessage;
      String serialMessage;
      
      switch(level) {
        case 0:
          levelMessage = "[!Prioridade Urgente!] ";
          break;
        case 1:
          levelMessage = "[!Prioridade Média!] ";
          break;
        case 2:
          levelMessage = "[Prioridade Baixa] ";
          break;
        case -1:
          levelMessage = "[Informativo] ";
        default:
          levelMessage = "[Prioridade N/A] ";
          break;
      }
      
      serialMessage = levelMessage + message;
      Serial.println(serialMessage);
    }

    // Método que exibe um código de erro em um display lcd definido na chamada
    // da função
    void displayMessage(String errorCode, LiquidCrystal_I2C lcd) {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print(errorCode);
    }
};