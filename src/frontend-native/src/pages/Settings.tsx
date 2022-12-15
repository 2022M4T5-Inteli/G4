import { useEffect, useRef, useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./Settings.css";

import { getDispositiveSettings, updateDispositiveSettings } from "../data/esp";

function SettingsSetup() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [serverName, setServerName] = useState("");
  const [ntpServer1, setNtpServer1] = useState("");
  const [ntpServer2, setNtpServer2] = useState("");
  const [tempMin, setTempMin] = useState(0.0);
  const [tempMax, setTempMax] = useState(0.0);
  const [tempHigh, setTempHigh] = useState(0.0);
  const [tempExtreme, setTempExtreme] = useState(0.0);
  const [minHumidity, setMinHumidity] = useState(0.0);
  const [maxHumidity, setMaxHumidity] = useState(0.0);

  const saveSettingsHandler = async () => {
    const settings = {
      serverName,
      ntpServer1,
      ntpServer2,
      tempMin,
      tempMax,
      tempHigh,
      tempExtreme,
      minHumidity,
      maxHumidity,
    };
    const response = await updateDispositiveSettings(settings);
    setAlertMessage(response.message);
    setShowAlert(true);
  };

  const loadDispositiveSettings = async () => {
    const response = await getDispositiveSettings();
    setServerName(response.settings.serverName);
    setNtpServer1(response.settings.ntpServer1);
    setNtpServer2(response.settings.ntpServer2);
    setTempMin(response.settings.tempMin);
    setTempMax(response.settings.tempMax);
    setTempHigh(response.settings.tempHigh);
    setTempExtreme(response.settings.tempExtreme);
    setMinHumidity(response.settings.minHumidity);
    setMaxHumidity(response.settings.maxHumidity);
  };

  useEffect(() => {
    loadDispositiveSettings();
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Configurações Gerais"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <img alt="Silhouette of mountains" src="/assets/wifi-card.png" />
        </IonCard>
        <IonItem>
          <IonLabel position="floating">Servidor remoto (API):</IonLabel>
          <IonInput
            placeholder="https://meu-servidor-api.com"
            value={serverName}
            onIonChange={(e: any) => setServerName(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Servidor Ntp Principal:</IonLabel>
          <IonInput
            placeholder="servidor-ntp.ntp.org"
            value={ntpServer1}
            onIonChange={(e: any) => setNtpServer1(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Servidor Ntp Alternativo:</IonLabel>
          <IonInput
            value={ntpServer2}
            placeholder="servidor-ntp.ntp.org"
            onIonChange={(e: any) => setNtpServer2(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Temperatura Mínima (°C):</IonLabel>
          <IonInput
            value={tempMin}
            placeholder="20.0"
            onIonChange={(e: any) => setTempMin(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Temperatura Máxima (°C):</IonLabel>
          <IonInput
            value={tempMax}
            placeholder="30.0"
            onIonChange={(e: any) => setTempMax(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Temperatura Alta (°C):</IonLabel>
          <IonInput
            value={tempHigh}
            placeholder="35.0"
            onIonChange={(e: any) => setTempHigh(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">
            Temperatura Extremamente Alta (°C):
          </IonLabel>
          <IonInput
            value={tempExtreme}
            placeholder="40.0"
            onIonChange={(e: any) => setTempExtreme(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Umidade Baixa (%):</IonLabel>
          <IonInput
            value={minHumidity}
            placeholder="20.0"
            onIonChange={(e: any) => setMinHumidity(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Umidade Alta (%):</IonLabel>
          <IonInput
            value={maxHumidity}
            placeholder="30.0"
            onIonChange={(e: any) => setMaxHumidity(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonButton onClick={saveSettingsHandler}>Salvar Informações</IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Status"
          // subHeader="Important message"
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
}

export default SettingsSetup;
