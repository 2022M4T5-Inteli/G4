import { useEffect, useRef, useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./Extract.css";

import { clearDataBuffer } from "../data/esp";

import { cloudDownload, trashBin } from "ionicons/icons";
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
          <img alt="Silhouette of mountains" src="/assets/backup-card.png" />
        </IonCard>
        <IonButton
          className="navigation-button"
          download={"Dados"}
          target="_blank"
          href={`${API_BASE}/extract`}
        >
          <IonIcon slot="start" icon={cloudDownload}></IonIcon>
          <IonText>Baixar CSV</IonText>
        </IonButton>

        <IonButton className="navigation-button" onClick={clearBufferHandler}>
          <IonIcon slot="start" icon={trashBin}></IonIcon>
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
