//codigo referente a pagina que contem a lista de todas as estufas, pagina inicial
//importando os componentes do ionic
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  useIonAlert,
} from "@ionic/react";
import { updateEstufaName } from "../data/estufas";
//importando  css da pagina
import "./EstufaListItem.css";

interface MessageListItemProps {
  name: string;
  temperature: number;
  humidity: number;
  id: string | number;
  time: string;
  refreshHandler: () => void;
}

const EstufaListItem: React.FC<MessageListItemProps> = ({
  name,
  temperature,
  humidity,
  id,
  time,
  refreshHandler,
}) => {
  const [presentAlert] = useIonAlert();
  const [editAlert] = useIonAlert();

  const editEstufaHandler = async (id: string | number, newName: string) => {
    const response = await updateEstufaName(id, newName);

    editAlert({
      header: "Sucesso!",
      message: response.message,
      buttons: ["OK"],
    });

    refreshHandler();
  };

  const onclickHandler = () =>
    presentAlert({
      header: "Insira o novo nome do dispositivo",
      inputs: [
        {
          name: "dispositiveName",
          label: "Nome da estufa",
          placeholder: "Estufa X",
          value: name,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Salvar",
          role: "confirm",
          handler: (alertData) => {
            editEstufaHandler(id, alertData.dispositiveName);
          },
        },
      ],
    });

  return (
    //criando o link de cada estufa pelo id e criando o conteudo de cada card
    //<IonCard routerLink={`/estufa/${id}`}>
    <IonCard
      onClick={(e) => {
        onclickHandler();
        e.preventDefault();
      }}
    >
      <IonCardContent className="card-container">
        <div className="metrics-div flex-start">
          <IonText className="card-name">
            {id} - {name}
          </IonText>
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
