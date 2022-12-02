import { useState } from "react";
import {

} from "../data/esp";
import {
  IonBadge,
  IonButton,
  IonButtons,
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
  IonImg,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { wifi, refresh, settings, alertCircle, albums} from "ionicons/icons";
import EstufaListItem from "../components/EstufaListItem";

const Home: React.FC = () => {
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
              <b>Status da conexão:</b> <p> Desconectado</p>
            </IonText>
            <IonText>
              <b>Endereço de conexão:</b> <p>-</p>
            </IonText>
            <IonText>
              <b>Mac:</b> <p>Desconectado</p>
            </IonText>
            <IonText>
              <b>Ip de configuração padrão:</b> <p>192.168.4.1</p>
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonButton className="navigation-button" routerLink="/wifi-settings">
          <IonIcon slot="start" icon={wifi}></IonIcon>
          <IonText>Configurar WiFi</IonText>
        </IonButton>
        <IonButton className="navigation-button" routerLink="/wifi-settings">
          <IonIcon slot="start" icon={settings}></IonIcon>
          <IonText>Configurações Gerais</IonText>
        </IonButton>
        <IonButton className="navigation-button" routerLink="/wifi-settings">
          <IonIcon slot="start" icon={albums}></IonIcon>
          <IonText>Extração Manual</IonText>
        </IonButton>        
        <IonButton className="navigation-button">
          <IonIcon slot="start" icon={alertCircle}></IonIcon>
          <IonText>Resetar padrões de fábrica</IonText>
        </IonButton>
      </IonContent>
      <IonFooter className="content-footer">
        <IonFabButton>
          <IonIcon icon={refresh}></IonIcon>
        </IonFabButton>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
