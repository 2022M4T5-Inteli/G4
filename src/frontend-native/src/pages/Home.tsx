import { useState } from "react";
import { getDispositiveInfo, IDispositiveInfo } from "../data/esp";
import {
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
} from "@ionic/react";
import "./Home.css";
import { wifi, refresh, settings, alertCircle, albums } from "ionicons/icons";

const Home: React.FC = () => {
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
        apIp: "",
        networkIp: "",
      },
    });
    const data = await getDispositiveInfo();
    setDispositiveInfo(data);
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
            <IonButton
              className="navigation-button"
              routerLink="/wifi-settings"
            >
              <IonIcon slot="start" icon={albums}></IonIcon>
              <IonText>Extração Manual</IonText>
            </IonButton>
            <IonButton className="navigation-button">
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
              <IonIcon slot="start" icon={alertCircle}></IonIcon>
              <IonText>Sincronizar dispositivo</IonText>
            </IonButton>
          </>
        )}
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
