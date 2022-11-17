import { useState } from "react";
import {
  Estufa,
  getEstufas,
  IDispositivoDetailed,
  listDispositivosDetailed,
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

  useIonViewWillEnter(async () => {
    const dsp = await listDispositivosDetailed();

    const ntfcs = await listNotificacoesPendentes();
    const msgs = getEstufas();
    setEstufas(msgs);
    setDispositivo(dsp.data);
    setNotificacoes(ntfcs.data);
    console.log(dsp);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
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
          <IonButtons slot="end">
            <IonButton
              className="toolbar-buttons-container"
              routerLink={`/notifications`}
            >
              <IonBadge color={"danger"}>{notificacoes.length}</IonBadge>
              <IonIcon slot="icon-only" icon={notifications}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {dispositivos.map((d) => (
            <EstufaListItem
              key={d.id}
              id={d.id}
              name={d.estufa}
              temperature={d.Medidas[0].temperatura}
              humidity={d.Medidas[0].umidade}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
