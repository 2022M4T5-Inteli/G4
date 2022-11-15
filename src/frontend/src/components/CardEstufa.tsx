import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./CardEstufa.css";

export interface CardEstufaInputs {
  nome: string;
  temperatura: number;
  umidade: number;
}

const CardEstufa: React.FC<CardEstufaInputs> = ({
  nome,
  temperatura,
  umidade,
}) => {
  return (
    <IonCard className="card-wrapper">
      <IonCardContent className="card-container">
        <IonText className="card-name">{nome}</IonText>
        <div className="metrics-div">
          <IonText className="metrics-title">{temperatura}°C</IonText>
          <IonText className="metrics-title">{umidade}%</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CardEstufa;
