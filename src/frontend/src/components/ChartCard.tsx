//esse é o codigo referente a pagina do status de deteminada estufa
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
import "./ChartCard.css";
//importando o tipo de grafico
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
// import Chart, { CategoryScale } from "chart.js/auto";

interface DatasetProps {
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

interface ChartCardProps {
  data: {
    labels: string[];
    datasets: DatasetProps[];
  };
}

const ChartCard: React.FC<ChartCardProps> = ({ data }) => {
  // Chart.register(CategoryScale);
  return (
    <IonCard>
      <IonCardContent>
      {/* criando o conteudo do card */}
        <Line data={data} />
      </IonCardContent>
    </IonCard>
  );
};

export default ChartCard;
