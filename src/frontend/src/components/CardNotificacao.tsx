//importando os componentes do ionic
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import React from "react";
//importando o css
import "./CardNotificacao.css";

import { checkmark, close } from "ionicons/icons";
//exportando a interface
export interface CardNotificacaoInputs {
  nome: string;
  temperatura: number;
  umidade: number;
  aviso: string;
  onclickHandler: () => void;
}
//definindo as constantes que essa pagina ira usar:
const CardNotificacao: React.FC<CardNotificacaoInputs> = ({
  nome,
  temperatura,
  umidade,
  aviso,
  onclickHandler,
}) => {
  const [presentAlert] = useIonAlert();

  const confirmAction = async () => {
    presentAlert({
      header: "Dispensar alerta?",
      message:
        "Alertas deste tipo só ocorrerão após 30 minutos a partir do momento de dispensa.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Sim",
          role: "confirm",

          handler: () => {
            onclickHandler();
          },
        },
      ],
    });
  };

  return (
    //criando o card de notificação
    <IonCard>
      {/* criando o conteudo do card */}
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
            color="success"
            className="dispensarbutton"
            onClick={confirmAction}
          >
            Dispensar
            <IonIcon icon={checkmark} color={"light"} className="icon-class" />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CardNotificacao;
