//codigo referente a pagina que contem a lista de todas as estufas, pagina inicial
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
import "./EstufaListItem.css";

interface MessageListItemProps {
  name: string;
  temperature: number;
  humidity: number;
  id: string | number;
  time: string;
}

const EstufaListItem: React.FC<MessageListItemProps> = ({
  name,
  temperature,
  humidity,
  id,
  time,
}) => {
  return (
    //criando o link de cada estufa pelo id e criando o conteudo de cada card
    <IonCard routerLink={`/estufa/${id}`}>
      <IonCardContent className="card-container">
        <div className="metrics-div flex-start">
          <IonText className="card-name">{name}</IonText>
          <IonText className="card-subinfo">Atualizado às {time}</IonText>
        </div>
        <div className="metrics-div flex-end">
          <IonText className="card-name">{temperature}°C</IonText>
          <IonText className="card-name">{humidity}%</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default EstufaListItem;
