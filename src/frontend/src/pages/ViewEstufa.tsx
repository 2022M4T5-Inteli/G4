import { useRef, useState } from "react";
import { Estufa, EstufaDetailed, getEstufa } from "../data/estufas";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useParams } from "react-router";
import "./ViewEstufa.css";

import { close } from "ionicons/icons";
import StatusCard from "../components/StatusCard";
import ChartCard from "../components/ChartCard";

const dataTemperature = {
  labels: ["35m", "30m", "25m", "20m", "15m", "10m", "5m"],
  datasets: [
    {
      label: "Temperatura",
      data: [24.0, 24.6, 25.1, 27.0, 26.8, 26.5, 25.0],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const dataHumidity = {
  labels: ["35m", "30m", "25m", "20m", "15m", "10m", "5m"],
  datasets: [
    {
      label: "Umidade",
      data: [70, 69, 69, 68, 67, 66, 67],
      fill: false,
      borderColor: "rgb(100, 192, 192)",
      tension: 0.1,
    },
  ],
};

function ViewEstufa() {
  const [estufa, setEstufa] = useState<EstufaDetailed>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getEstufa(parseInt(params.id, 10));
    setEstufa(msg);
  });

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={`Estufa ${params.id}`}
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ChartCard data={dataTemperature} />
        <ChartCard data={dataHumidity} />
        <StatusCard
          id={"open-modal"}
          zenitaisPercentage={estufa?.zenitaisAbertura || 0}
          lateraisPercentage={estufa?.lateraisAbertura || 0}
        />
        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>Status das janelas</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonTitle>STATUS</IonTitle>
            <div className="flex-container">
              <div className="flex-child status">
                <IonText>Laterais</IonText>
                <IonText>Zenitais</IonText>
              </div>
              <div className="flex-child metricas">
                <IonText>100%</IonText>
                <IonText>30%</IonText>
              </div>
            </div>
            <IonTitle>HISTÓRICO</IonTitle>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default ViewEstufa;
