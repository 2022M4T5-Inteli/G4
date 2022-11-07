import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';

import React, { useState, useRef } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import { close } from "ionicons/icons";

function Example() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>
        <p>{message}</p>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}><IonIcon icon={close}/></IonButton>
              </IonButtons>
              <IonTitle>Status das janelas</IonTitle>
              {/* <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
  </IonButtons> */}
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

export default Example;