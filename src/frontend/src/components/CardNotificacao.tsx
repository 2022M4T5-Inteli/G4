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
import { check-outline } from 'ionicons/icons';
import "./CardNotificacao.css";

export interface CardNotificacaoInputs {
  nome: string;
  temperatura: number;
  umidade: number;
  aviso: string;
}

const CardNotificacao: React.FC<CardNotificacaoInputs> = ({
  nome,
  temperatura,
  umidade,
  aviso,
}) => {
  return (
    <IonCard>
      <IonCardContent className="container-card">
        <div className="header-div">
          <IonText className="name-card">{nome}</IonText>
          <IonText className="name-card">{temperatura}°C  {umidade}%</IonText>
        </div>
        <div className="aviso-div">
          <IonText className="aviso-text">{aviso}</IonText>
        </div>
        <div className="botao-div">
          <IonButton className="botao-nao"></IonButton>
          <IonButton className="botao-sim"></IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CardNotificacao;