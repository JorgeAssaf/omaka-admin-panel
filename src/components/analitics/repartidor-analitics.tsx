import { RepartidorType } from "../../types/typeRepartidor";
import Avatar from "../atoms/avatar/avatarUser";
import Typography from "../atoms/typography";

interface RepartidorAnaliticsProps {
  repartidoresList: any; //agregar nuevo types
}

const RepartidorAnalitics = ({ repartidoresList }) => {
  console.log(repartidoresList);
  
  return (
    <>
      {repartidoresList.map((repartidor) => (
        <div className="paper analitics-repartidor">
          <div className="paper-header">
            <Avatar
              src={repartidor.foto}
              fullName={repartidor.nombre}
              uuid={repartidor.idUsuario}
            />
            <Typography variant="cardTitle">{repartidor.nombre}</Typography>
          </div>
          <Typography variant="label">Pedidos</Typography>
          <div className="flex-row-start">
            <div className="item-anatilic-ruta">
              <div className="circle-status green" />
              <Typography variant="cardInfo">{`${repartidor.pedidosFinish.length}`}</Typography>
            </div>
            <div className="item-anatilic-ruta">
              <div className="circle-status red" />
              <Typography variant="cardInfo">{`${repartidor.pedidosReport.length}`}</Typography>
            </div>
            <div className="item-anatilic-ruta">
              <div className="circle-status black" />
              <Typography variant="cardInfo">{`${repartidor.pedidosPending.length} `}</Typography>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


export default RepartidorAnalitics;
