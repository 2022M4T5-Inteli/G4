import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { BsCheck2 } from 'ionicons/icons';
import './Tab2.css';
import CardNotificacao from '../components/CardNotificacao';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonFab>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CardNotificacao nome={'oi'} temperatura={0} umidade={0} aviso={'OI GIOVANNA HORA DO TESTE ABRE A JANELA CARAI'}></CardNotificacao>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

