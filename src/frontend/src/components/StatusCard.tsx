//importando os componentes do ionic
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from "@ionic/react";
//importando  css da pagina
import "./StatusCard.css";

interface StatusCardProps {
  zenitaisPercentage: number;
  lateraisPercentage: number;
  id: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  zenitaisPercentage,
  lateraisPercentage,
  id,
}) => {
  return (
    <IonCard id={id}>
      <IonCardContent>
        <div className="status-card-content">
          <IonText className="status-card-title">Status</IonText>
          <div className="status-card-subinfo">
            <div className="status-subinfo-wrapper">
              <IonText>Zenitais:</IonText>
              <IonText>{zenitaisPercentage}%</IonText>
            </div>
            <div className="status-subinfo-wrapper">
              <IonText>Laterais:</IonText>
              <IonText>{lateraisPercentage}%</IonText>
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default StatusCard;
