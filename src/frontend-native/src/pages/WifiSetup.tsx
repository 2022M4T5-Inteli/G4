import { useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./WifiSetup.css";

import { updateWifiCredentials } from "../data/esp";

import { checkmark } from "ionicons/icons";

function WifiSetup() {
  const [presentAlert] = useIonAlert();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const saveWifiHandler = async () => {
    const response = await updateWifiCredentials(ssid, password);
    setAlertMessage(response.message);
    setShowAlert(true);
  };

  const confirmAlert = async () => {
    presentAlert({
      header: "Confirmar alterações?",

      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Sim",
          role: "confirm",

          handler: () => {
            saveWifiHandler();
          },
        },
      ],
    });
  };
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Configurações de WiFi"
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
          <IonLabel position="floating">Nome da rede (ssid):</IonLabel>
          <IonInput
            placeholder="minha-rede-wifi"
            onIonChange={(e: any) => setSsid(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem fill="solid">
          <IonLabel position="floating">Senha da rede:</IonLabel>
          <IonInput
            placeholder="Enter text"
            type="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton className="navigation-button" onClick={confirmAlert}>
          <IonIcon slot="start" icon={checkmark}></IonIcon>
          <IonText>Salvar Informações</IonText>
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Status"
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
}

export default WifiSetup;
