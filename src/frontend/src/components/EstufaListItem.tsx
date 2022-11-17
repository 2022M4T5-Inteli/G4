import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from "@ionic/react";
import "./EstufaListItem.css";

interface MessageListItemProps {
  name: string;
  temperature: number;
  humidity: number;
  id: string | number;
}

const EstufaListItem: React.FC<MessageListItemProps> = ({
  name,
  temperature,
  humidity,
  id,
}) => {
  return (
    <IonCard routerLink={`/estufa/${id}`}>
      <IonCardContent className="card-container">
        <IonText className="card-name">{name}</IonText>
        <div className="metrics-div">
          <IonText className="card-name">{temperature}°C</IonText>
          <IonText className="card-name">{humidity}%</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default EstufaListItem;
