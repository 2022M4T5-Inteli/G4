class BuzzerController {
  public:
    int BUZZER_PIN;
    void playInicializationSound() {
      tone(BUZZER_PIN, 2000,250);
      delay(250);
      tone(BUZZER_PIN, 2000,250);
    }

    void playSuccessSound() {
      tone(BUZZER_PIN, 1554,500);
      tone(BUZZER_PIN, 1957,500);
      tone(BUZZER_PIN, 2328,500);
    }

    void playAlert() {
      tone(BUZZER_PIN, 1200, 1000);
    }

    BuzzerController(int BUZZER_PIN_NUMBER){
      BUZZER_PIN = BUZZER_PIN_NUMBER;
    }
};