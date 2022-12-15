import { useState } from "react";
import {
  getDispositiveInfo,
  IDispositiveInfo,
  resetDispositive,
} from "../data/esp";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  useIonAlert,
} from "@ionic/react";
import "./Home.css";
import {
  wifi,
  refresh,
  settings,
  alertCircle,
  albums,
  link,
} from "ionicons/icons";

const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const resetDispositiveHandler = async () => {
    const response = await resetDispositive();
    setAlertMessage(response.message);
    setShowAlert(true);
  };

  const [dispositiveInfo, setDispositiveInfo] = useState({
    data: {
      dispositiveId: "",
      connected: false,
      mac: "",
      apIp: "",
      networkIp: "",
    },
  });

  const reloadButtonHandler = async () => {
    setDispositiveInfo({
      data: {
        dispositiveId: "",
        connected: false,
        mac: "",
        apIp: "123",
        networkIp: "",
      },
    });
    const data = await getDispositiveInfo();
    setDispositiveInfo(data);
  };

  const resetAlert = async () => {
    presentAlert({
      header: "Tem certeza de que deseja resetar o dispositivo?",
      message: " Todas as configurações serão apagadas!",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "Não",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("Cancelado!");
          },
        },
        {
          text: "Sim",
          cssClass: "alert-button-confirm",
          handler: () => {
            resetDispositiveHandler();
          },
        },
      ],
    });
  };

  return (
    <IonPage id="home-page">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="/assets/card-placeholder.png"
          />
          <IonCardHeader>
            <IonCardTitle>Estufa Manager</IonCardTitle>
            <IonCardSubtitle>Configuração dos dispositivos IOT</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText>
              <p>
                <b>Id do dispositivo: {dispositiveInfo.data.dispositiveId}</b>
              </p>
              <b>Status da conexão:</b>{" "}
              <p>
                {dispositiveInfo.data.connected ? "Conectado" : "Desconectado"}
              </p>
            </IonText>
            <IonText>
              <b>Ip de conexão local:</b>{" "}
              <p>{dispositiveInfo.data.networkIp}</p>
            </IonText>
            <IonText>
              <b>Mac:</b> <p>{dispositiveInfo.data.mac}</p>
            </IonText>
            <IonText>
              <b>Ip de conexão do Hotspost (AP):</b>{" "}
              <p>{dispositiveInfo.data.apIp}</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {dispositiveInfo.data.apIp ? (
          <>
            {" "}
            <IonButton
              className="navigation-button"
              routerLink="/wifi-settings"
            >
              <IonIcon slot="start" icon={wifi}></IonIcon>
              <IonText>Configurar WiFi</IonText>
            </IonButton>
            <IonButton
              className="navigation-button"
              routerLink="/general-settings"
            >
              <IonIcon slot="start" icon={settings}></IonIcon>
              <IonText>Configurações Gerais</IonText>
            </IonButton>
            <IonButton className="navigation-button" routerLink="/extract">
              <IonIcon slot="start" icon={albums}></IonIcon>
              <IonText>Extração Manual</IonText>
            </IonButton>
            <IonButton className="navigation-button" onClick={resetAlert}>
              <IonIcon slot="start" icon={alertCircle}></IonIcon>
              <IonText>Resetar padrões de fábrica</IonText>
            </IonButton>
          </>
        ) : (
          <>
            <IonButton
              className="navigation-button"
              onClick={reloadButtonHandler}
            >
              <IonIcon slot="start" icon={link}></IonIcon>
              <IonText>Sincronizar dispositivo</IonText>
            </IonButton>
          </>
        )}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Status"
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
      <IonFooter className="content-footer">
        <IonFabButton onClick={reloadButtonHandler}>
          <IonIcon icon={refresh}></IonIcon>
        </IonFabButton>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
