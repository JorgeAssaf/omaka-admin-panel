import { OrderType } from "../../types/typeOrders";
import { cardPropsType } from "../../types/typesCards";
import { CardInformacion } from "../generalCards/general-card";
import CardPedidos from "../generalCards/pedidos-card";
import CardRepartidor from "../generalCards/repartidor-card";
import './styles.css';

type CardListInterface = {
  data: any[];
  tipo: string;
  variant?: string;
  cardProps?: cardPropsType;
  onClickItem: (item: OrderType | any) => void;
};

export const CardList = ({ data, tipo, cardProps, onClickItem, variant }: CardListInterface) => {
  
  switch (tipo) {
    case 'pedidos':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return <CardPedidos variant={variant} cardProps={cardProps} onClick={(item)=>onClickItem && onClickItem(item)} data={item} />;
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
    case 'repartidor':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return <CardRepartidor cardProps={cardProps} onClick={(item)=>onClickItem && onClickItem(item)} data={item} />;
          })}
        </div>
      )
      break;
    default:
      return(<></>);
      break;
  }
  
};

