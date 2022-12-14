import { useEffect, useState } from "react";
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

import { Capacitor } from "@capacitor/core";

import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";

const Home: React.FC = () => {
  function requestInternetPermission() {
    if (Capacitor.isNativePlatform()) {
      AndroidPermissions.checkPermission(
        AndroidPermissions.PERMISSION.INTERNET
      ).then((result) => {
        if (result.hasPermission) {
        } else {
          //alert('please implement permission request')
          AndroidPermissions.requestPermission(
            AndroidPermissions.PERMISSION.INTERNET
          );
        }
      });
    } else {
      console.log("Capacitor not detected, this button will do nothing :(");
    }


    if (Capacitor.isNativePlatform()) {
      AndroidPermissions.checkPermission(
        AndroidPermissions.PERMISSION.ACCESS_NETWORK_STATE
      ).then((result) => {
        if (result.hasPermission) {
        } else {
          //alert('please implement permission request')
          AndroidPermissions.requestPermission(
            AndroidPermissions.PERMISSION.ACCESS_NETWORK_STATE
          );
        }
      });
    } else {
      console.log("Capacitor not detected, this button will do nothing :(");
    }
  }

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
    requestInternetPermission();
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

  const resetAlert = async () => {
    presentAlert({
      header: "Tem certeza de que deseja resetar o dispositivo?",
      message: " Todas as configura????es ser??o apagadas!",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "N??o",
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
            <IonCardSubtitle>Configura????o dos dispositivos IOT</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText>
              <p>
                <b>Id do dispositivo: {dispositiveInfo.data.dispositiveId}</b>
              </p>
              <b>Status da conex??o:</b>{" "}
              <p>
                {dispositiveInfo.data.connected ? "Conectado" : "Desconectado"}
              </p>
            </IonText>
            <IonText>
              <b>Ip de conex??o local:</b>{" "}
              <p>{dispositiveInfo.data.networkIp}</p>
            </IonText>
            <IonText>
              <b>Mac:</b> <p>{dispositiveInfo.data.mac}</p>
            </IonText>
            <IonText>
              <b>Ip de conex??o do Hotspost (AP):</b>{" "}
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
              <IonText>Configura????es Gerais</IonText>
            </IonButton>
            <IonButton className="navigation-button" routerLink="/extract">
              <IonIcon slot="start" icon={albums}></IonIcon>
              <IonText>Extra????o Manual</IonText>
            </IonButton>
            <IonButton className="navigation-button" onClick={resetAlert}>
              <IonIcon slot="start" icon={alertCircle}></IonIcon>
              <IonText>Resetar padr??es de f??brica</IonText>
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
