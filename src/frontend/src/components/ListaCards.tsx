import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import CardEstufa from "./CardEstufa";
import "./CardEstufa.css";

interface CardEstufaInputs {
  nome: string;
  temperatura: number;
  umidade: number;
}

interface ListaCardInputs {
  listaCards: CardEstufaInputs[];
}

const ListaCards: React.FC<ListaCardInputs> = ({ listaCards }) => {
  return (
    <div className="estufa-list">
      {listaCards.map((objetoEstufa) => {
        return (
          <CardEstufa
            nome={objetoEstufa.nome}
            temperatura={objetoEstufa.temperatura}
            umidade={objetoEstufa.umidade}
            key={objetoEstufa.nome}
          />
        );
      })}
    </div>
  );
};

export default ListaCards;
