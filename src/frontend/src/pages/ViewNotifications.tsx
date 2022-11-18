import { useRef, useState } from "react";
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
import "./ViewNotifications.css";

import { close, refresh } from "ionicons/icons";
import StatusCard from "../components/StatusCard";
import ChartCard from "../components/ChartCard";
import EstufaListItem from "../components/EstufaListItem";
import { Estufa, getEstufas } from "../data/estufas";
import CardNotificacao from "../components/CardNotificacao";
import {
  INotificacao,
  listNotificacoesPendentes,
  notificationStatusMap,
  updateNotificacaoStatus,
} from "../data/notificacoes";

function ViewNotifications() {
  const params = useParams<{ id: string }>();

  const [estufas, setEstufas] = useState<Estufa[]>([]);
  const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);

  useIonViewWillEnter(async () => {
    const ntfcs = await listNotificacoesPendentes();
    const msgs = getEstufas();
    setEstufas(msgs);
    setNotificacoes(ntfcs.data);
  });

  const refresh = async (e: CustomEvent) => {
    const ntfcs = await listNotificacoesPendentes();
    const msgs = getEstufas();
    setEstufas(msgs);
    setNotificacoes(ntfcs.data);
    e.detail.complete();
  };

  async function onNotificationDismissHandler(notificationId: number) {
    const dismissedNotification = await updateNotificacaoStatus(
      notificationId,
      1
    );
    const ntfcs = await listNotificacoesPendentes();
    const msgs = getEstufas();
    setEstufas(msgs);
    setNotificacoes(ntfcs.data);
    console.log(dismissedNotification);
  }

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Notificações Pendentes"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {notificacoes.map((n) => (
            <CardNotificacao
              key={n.id}
              nome={n.dispositivo.estufa}
              temperatura={n.gatilho.temperatura}
              umidade={n.gatilho.umidade}
              aviso={notificationStatusMap[n.tipo]}
              onclickHandler={() => {
                return onNotificationDismissHandler(n.id);
              }}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default ViewNotifications;
