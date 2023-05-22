import { format } from "date-fns";
import Typography from "../atoms/typography";
import Colors from "../../utils/colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface RutaAnaliticsProps {
  title: string;
  ratesFinish: number;
  ratesInProgress: number;
  ratesPendings: number;
  timeAndDistance: any;
}

const RutaAnalitics = ({
  title = "",
  ratesFinish = 0,
  ratesInProgress = 0,
  ratesPendings = 0,
  timeAndDistance
}: RutaAnaliticsProps) => {
  const data = {
    labels: ["Terminados", "En progreso", "Pendientes"],
    datasets: [
      {
        label: "rutas",
        data: [ratesFinish, ratesInProgress, ratesPendings],
        backgroundColor: [
          Colors().chalchihuitl400,
          Colors().texotli300,
          Colors().tizatl600
        ]
      }
    ]
  };
  return (
    <div className="paper analitics">
      <div className="paper-header">
        <Typography variant="cardTitle">{title}</Typography>
      </div>
      {timeAndDistance?.tiempoTotalGlobal ? (
        <>
          <Typography variant="cardInfo">{`Tiempo en ruta: ${format(
            timeAndDistance.tiempoTotalGlobal * 1000,
            "HH:mm"
          )}`}</Typography>
          <Typography variant="cardInfo">{`Distancia recorrida: ${parseFloat(
            timeAndDistance.distanciaTotalGlobal
          ).toFixed(2)} km`}</Typography>
        </>
      ) : null}

      <div className="analitics-chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
};
export default RutaAnalitics;
