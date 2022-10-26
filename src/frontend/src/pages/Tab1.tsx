import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import CardEstufa from "../components/CardEstufa";
import ExploreContainer from "../components/ExploreContainer";
import ListaCards from "../components/ListaCards";
import "./Tab1.css";

const listaItens = [
  { nome: "ItemA", temperatura: 18.0, umidade: 80 },
  { nome: "ItemB", temperatura: 20.0, umidade: 80 },
  { nome: "ItemC", temperatura: 18.0, umidade: 80 },
  { nome: "ItemD", temperatura: 18.0, umidade: 80 },
  { nome: "ItemE", temperatura: 18.0, umidade: 80 },
  { nome: "ItemE", temperatura: 18.0, umidade: 80 },
  { nome: "ItemE", temperatura: 18.0, umidade: 80 },
  { nome: "ItemE", temperatura: 18.0, umidade: 80 },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gerdau Florestal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ListaCards listaCards={listaItens}/>
        <IonFab
          vertical="bottom"
          horizontal="center"
          slot="fixed"
          className="floating-add-button"
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
