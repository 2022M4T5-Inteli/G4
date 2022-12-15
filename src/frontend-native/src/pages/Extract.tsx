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
import "./Extract.css";

import { clearDataBuffer } from "../data/esp";

import { wifi, refresh, settings, alertCircle, albums } from "ionicons/icons";
import { API_BASE } from "../constants";

function Extract() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const clearBufferHandler = async () => {
    const response = await clearDataBuffer();
    setAlertMessage(response.message);
    setShowAlert(true);
  };

  const downloadCsv = () => {
    window.open(`${API_BASE}/extract`, "_blank", "noreferrer");
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Extração Manual"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <img alt="Silhouette of mountains" src="/assets/wifi-card.png" />
        </IonCard>
        <IonButton
          className="navigation-button"
          download={"Dados"}
          target="_blank"
          href={`${API_BASE}/extract`}
        >
          <IonIcon slot="start" icon={wifi}></IonIcon>
          <IonText>Baixar CSV</IonText>
        </IonButton>

        <IonButton className="navigation-button" onClick={clearBufferHandler}>
          <IonIcon slot="start" icon={wifi}></IonIcon>
          <IonText>Limpar dados locais</IonText>
        </IonButton>

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

export default Extract;
