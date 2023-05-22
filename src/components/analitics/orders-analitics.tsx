import Typography from "../atoms/typography";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import Colors from "../../utils/colors";
ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderAnaliticsProps {
    title: string;
    orderFinish: number;
    orderReport: number;
    orderPendings: number;
}

const OrderAnalitics = ({ title='', orderFinish=0, orderReport=0,orderPendings=0 }: OrderAnaliticsProps) =>  {
  const data = {
    labels: ["Terminados", "Reportados", "Pendientes"],
    datasets: [
      {
        label: "pedidos",
        data: [orderFinish, orderReport, orderPendings],
        backgroundColor: [
          Colors().chalchihuitl400,
          Colors().xochipaltic400,
          Colors().tizatl600
        ]
      }
    ]
  };

  return(
    <div className="paper analitics">
      <div className="paper-header">
        <Typography variant="cardTitle">{title}</Typography>
      </div>
      <div className="analitics-chart-container">

        <Pie data={data} />
      </div>
    </div>
  )};

export default OrderAnalitics;
