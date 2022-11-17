import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from "@ionic/react";
import "./ChartCard.css";

import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";

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
  Chart.register(CategoryScale);
  return (
    <IonCard>
      <IonCardContent>
        <Line data={data} />
      </IonCardContent>
    </IonCard>
  );
};

export default ChartCard;
