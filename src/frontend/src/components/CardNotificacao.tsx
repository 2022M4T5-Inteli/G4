import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import React from "react";

import "./CardNotificacao.css";

import { checkmark, close } from "ionicons/icons";

export interface CardNotificacaoInputs {
  nome: string;
  temperatura: number;
  umidade: number;
  aviso: string;
  onclickHandler: () => void;
}

const CardNotificacao: React.FC<CardNotificacaoInputs> = ({
  nome,
  temperatura,
  umidade,
  aviso,
  onclickHandler,
}) => {
  return (
    <IonCard>
      <IonCardContent className="container-card">
        <div className="header-div">
          <IonText className="name-card">{nome}</IonText>
          <IonText className="name-card">
            {temperatura}°C {umidade}%
          </IonText>
        </div>
        <div className="aviso-div">
          <IonText className="aviso-text">{aviso}</IonText>
        </div>
        <div className="botao-div">
          <IonButton
            onClick={() => {
              onclickHandler();
            }}
          >
            Dispensar
            <IonIcon icon={checkmark} color={"light"} />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CardNotificacao;
