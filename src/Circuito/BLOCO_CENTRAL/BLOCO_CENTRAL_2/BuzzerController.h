//Cria uma classe para o controle do buzzer
class BuzzerController {
  public:
    int BUZZER_PIN; //Define o respectivo pin do buzzer
    void playInicializationSound() {//Define o som de inicialização do protótipo
      tone(BUZZER_PIN, 2000,250);
      delay(250);
      tone(BUZZER_PIN, 2000,250);
    }

    void playSuccessSound() {//Define o som de sucesso do protótipo
      tone(BUZZER_PIN, 1554,500);
      tone(BUZZER_PIN, 1957,500);
      tone(BUZZER_PIN, 2328,500);
    }

    void playAlert() {//Define o som de alerta do protótipo
      tone(BUZZER_PIN, 1200, 1000);
    }

    BuzzerController(int BUZZER_PIN_NUMBER){//Define qual o pin do buzzer a partir do seu número
      BUZZER_PIN = BUZZER_PIN_NUMBER;
    }
};