import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import CardEstufa from "../components/CardEstufa";
import ExploreContainer from "../components/ExploreContainer";
import ListaCards from "../components/ListaCards";
import "./Tab1.css";


const listaItens = [
  { nome: "Estufa 1", temperatura: 18.0, umidade: 80 },
  { nome: "Estufa 2", temperatura: 20.0, umidade: 80 },
  { nome: "Estufa 3", temperatura: 18.0, umidade: 80 },
  { nome: "Estufa 4", temperatura: 18.0, umidade: 80 },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonImg className="logoWeb" src="./KeepGrowing.png" ></IonImg> */}
          <IonImg className="logo" src="./KeepGrowing2.png" ></IonImg>

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
