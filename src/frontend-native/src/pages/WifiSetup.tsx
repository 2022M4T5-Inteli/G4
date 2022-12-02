import { useEffect, useRef, useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useParams } from "react-router";
import "./WifiSetup.css";

import { close, refresh } from "ionicons/icons";
import { updateWifiCredentials } from "../data/esp";


function WifiSetup() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const saveWifiHandler = async () =>{
    const response = await updateWifiCredentials(ssid, password);
    setAlertMessage(response.message);
    setShowAlert(true)
  }
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
          <img
            alt="Silhouette of mountains"
            src="/assets/wifi-card.png"
          />
        </IonCard>
        <IonItem>
          <IonLabel position="floating">Nome da rede (ssid):</IonLabel>
          <IonInput placeholder="minha-rede-wifi"  onIonChange={(e: any) => setSsid(e.target.value)}></IonInput>
        </IonItem>

        <IonItem fill="solid">
          <IonLabel position="floating">Senha da rede:</IonLabel>
          <IonInput placeholder="Enter text" type="password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
        </IonItem>
        <IonButton onClick={saveWifiHandler}>Salvar Informações</IonButton>

        <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Status"
        // subHeader="Important message"
        message={alertMessage}
        buttons={['OK']}
      />
      </IonContent>
    </IonPage>
  );
}

export default WifiSetup;
