import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { GetOrders, newOrder } from '../../api/ordersQuerys';
import { CardList } from '../../components/cardList/cards-list';
import HeaderSection from '../../components/header/headerSection';
import MapView from '../../components/map/MapView';
import { getListaPedidos } from '../../redux/actions';
import { RootState } from '../../redux/reducers/mainReducer';
import { AppDispatch } from '../../redux/store';
import { OrderType, OrderTypeForm } from '../../types/typeOrders';
import NuevoPedido from './nuevo-pedido';
import './styles.css'

export const PanelPedidos = () =>{
  const [screenShow, setScreenShow] = useState('list');
  const [loading,setLoading] = useState(false);
  const {DatosPersonales} = useSelector((state: RootState) => state.user.userData as any);
  const orderList = useSelector((state: RootState) => state.pedidos.orderList);
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      getOrderList();
    }, []);

    const getOrderList = async () => {
      dispatch(getListaPedidos(DatosPersonales.idUsuario));
    };
   
   
    const newOrderClient = async (orderData: OrderTypeForm) => {
      setLoading(true);
      const resOrder =  await newOrder(orderData,DatosPersonales.idUsuario, true);
      getOrderList();
      setLoading(false);
      setScreenShow('list');
      if(resOrder.status == 'OK'){
        toast.success('Pedido creado exitosamente!!')
      }else{
        toast.error('Algo paso mal');
        toast.error(resOrder.errorMessage)
      }
    }
    const arrayPed=[{ubicacionPedido:{lat:20.67171803720562,lng:-103.47215320422521}},{ubicacionPedido:{lat:20.69271803720562,lng:-103.47215320422521}},{ubicacionPedido:{lat:20.57171803720562,lng:-103.47215320422521}}]

      return(
        <div className='pedidos_container'>
          <div className={screenShow == 'new'? ' lista_container contracted':'lista_container'}>
            <div className='header_container'>
              <HeaderSection actionBack={screenShow != 'list' ? ()=>setScreenShow('list'): undefined} title={screenShow == 'list'?'Pedidos':'Nuevo pedido'} actionBtnAdd={screenShow == 'list' ? ()=>setScreenShow('new'): undefined} />
            </div>
            {screenShow == 'list'?
              <CardList onClickItem={()=>null} tipo='pedidos' data={orderList} />
              :
              <NuevoPedido loading={loading} handleSubmit={newOrderClient}/>
            }
          </div>
          <div className='mapa_container'>
            <MapView points={arrayPed} screenShow={screenShow}/>
          </div>
          <ToastContainer
            limit={1}
            position="bottom-center"
            autoClose={3000}
            toastClassName="toast"
          />
        </div>
        
      );
}