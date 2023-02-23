import { CardInformacion } from "../generalCards/general-card";
import CardPedidos from "../generalCards/pedidos-card";
import './styles.css';

type CardListInterface = {
  data: any[];
  tipo: string;
};

export const CardList = ({ data, tipo }: CardListInterface) => {
  
  switch (tipo) {
    case 'pedidos':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return <CardPedidos data={item} />;
          })}
        </div>
      )
      break;
    case 'rutas':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return <CardInformacion data={item} />;
          })}
        </div>
      )
      break;
    default:
      return(<></>);
      break;
  }
  
};

