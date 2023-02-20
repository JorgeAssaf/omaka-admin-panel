import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { GetOrders, newOrder } from '../../api/ordersQuerys';
import { CardList } from '../../components/cardList/cards-list';
import HeaderSection from '../../components/header/headerSection';
import { RootState } from '../../redux/reducers/mainReducer';
import { OrderType, OrderTypeForm } from '../../types/typeOrders';
import NuevoPedido from './nuevo-pedido';
import './styles.css'
export const PanelPedidos = () =>{
  const [screenShow, setScreenShow] = useState('list');
  const [orderList,setOrderList] = useState <OrderType[]> ([])
  const [loading,setLoading] = useState(false);
  const {DatosPersonales} = useSelector((state: RootState) => state.user.userData as any);

    useEffect(() => {
      getOrderList();
    }, []);

    const getOrderList = async () => {
      const resOrder = await GetOrders(DatosPersonales.idUsuario);
      if (resOrder) {
        console.log(resOrder);
        
        setOrderList(resOrder.pedidosSinRuta);
      } else {
        console.error('Error en getOrderList');
      }
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


    
      return(
        <div className='pedidos_container'>
          <div className={screenShow == 'new'? ' lista_container contracted':'lista_container'}>
            <div className='header_container'>
              <HeaderSection actionBack={screenShow != 'list' ? ()=>setScreenShow('list'): undefined} title={screenShow == 'list'?'Pedidos':'Nuevo pedido'} actionBtnAdd={screenShow == 'list' ? ()=>setScreenShow('new'): undefined} />
            </div>
            {screenShow == 'list'?
              <CardList tipo='pedidos' data={orderList} />
              :
              <NuevoPedido loading={loading} handleSubmit={newOrderClient}/>
            }
          </div>
          <div className='mapa_container'>
            <img style={{width:'100%'}} src='https://cdn-3.expansion.mx/dims4/default/b77fb0a/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2012%2F06%2F20%2Ftrafico-transito-google-maps-ciudad-de-mexico.jpg' />
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