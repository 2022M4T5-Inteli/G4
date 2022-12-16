import { useState } from "react";
import {
  Estufa,
  getEstufas,
  IDispositivoDetailed,
  listDispositivosDetailed,
  updateEstufaName,
} from "../data/estufas";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { notifications } from "ionicons/icons";
import EstufaListItem from "../components/EstufaListItem";
import { INotificacao, listNotificacoesPendentes } from "../data/notificacoes";

const Home: React.FC = () => {
  const [estufas, setEstufas] = useState<Estufa[]>([]);
  const [dispositivos, setDispositivo] = useState<IDispositivoDetailed[]>([]);
  const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);

  const refresh = async () => {
    const dsp = await listDispositivosDetailed();

    const ntfcs = await listNotificacoesPendentes();
    const msgs = getEstufas();
    setEstufas(msgs);
    setDispositivo(dsp.data);
    setNotificacoes(ntfcs.data);
    // automatically refresh every 15 seconds
    setTimeout(refresh, 15000);
  };

  useIonViewWillEnter(async () => {
    await refresh();
  });

  function datetimeToTime(datetime: string) {
    const dateConverted = new Date(datetime);
    let hour = dateConverted.getUTCHours();
    let minutes = dateConverted.getUTCMinutes();

    let hourConverted = "";
    let minutesConverted = "";

    if (hour < 10) {
      hourConverted = `0${hour}`;
    } else {
      hourConverted = String(hour);
    }

    if (minutes < 10) {
      minutesConverted = `0${minutes}`;
    } else {
      minutesConverted = String(minutes);
    }

    const time = `${hourConverted}:${minutesConverted}`;

    return time;
  }

  const refreshHandler = async (e: CustomEvent) => {
    await refresh();
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonImg
            slot="start"
            className="logo"
            src="./assets/keepgrowing-logo.png"
          ></IonImg>
          <IonButtons className="notificationbutton" slot="end">
            <IonButton
              size="large"
              className="toolbar-buttons-container"
              routerLink={`/notifications`}
            >
              <IonBadge color={"danger"}>{notificacoes.length}</IonBadge>
              <IonImg
                // size="x-large" className="butao" slot="icon-only" icon={notifications}
                slot="end"
                className="notificationpagebutton"
                src="./assets/bellicon.png"
              ></IonImg>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshHandler}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {dispositivos.map((d) => (
            <EstufaListItem
              key={d.id}
              id={d.id}
              name={d.estufa}
              temperature={d.Medidas[0] ? d.Medidas[0].temperatura : 0.0}
              humidity={d.Medidas[0] ? d.Medidas[0].umidade : 0.0}
              time={
                d.Medidas[0]
                  ? datetimeToTime(d.Medidas[0].datetime)
                  : "--/--/--"
              }
              refreshHandler={refresh}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
