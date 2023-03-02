import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetOrders } from "../../api/ordersQuerys";
import { Buttons } from "../../components/atoms/buttons";
import CheckBox from "../../components/atoms/checkBox/checkbox";
import HeaderSection from "../../components/header/headerSection";
import { RootState } from "../../redux/reducers/mainReducer";
import { OrderType, OrderTypeForm } from "../../types/typeOrders";
import { RateTypeForm, RateTypeFormSimple } from "../../types/typeRate";
import Colors from "../../utils/colors";
import { DetallesRuta } from "../rutas/detalles-ruta";
import FormularioDatos from "./formulario-datos";
import { FormularioPedidos } from "./formulario-pedidos";
import { FormularioRepartidores } from "./formulario-repartidores";
import './styles.css';

type NuevaRutaProps = {
  handleSubmit: (ruta: RateTypeFormSimple) => void;
  fetching: boolean;
  setScreenShow: (screen : string) => void
};




const NuevoRuta = ({ handleSubmit,setScreenShow, fetching, }: NuevaRutaProps) => {
  const [screenLocal, setScreenLocal] = useState("data");
  const [loading, setLoading] = useState(false);
  const [allPedidosList, setAllPedidosList ] = useState<OrderType[]> ([]);
  const [pedidosInRate, setPedidosInRate ] = useState<OrderType[]> ([]);
  const [dataForm, setDataForm] = useState({} as RateTypeFormSimple);
  const {DatosPersonales} = useSelector((state: RootState) => state.user.userData as any);

  const callBackRate = () => {
    if(dataForm.nombreRuta && dataForm.fechaEntrega){
      console.log('crear ruta');
      
    }else{
      toast.error('Llena todos los campos')
    }
  }
  
  useEffect(() => {
    getOrderList();
  }, [])
  

  const getOrderList = async () => {
    setLoading(true);
    const resOrder = await GetOrders(DatosPersonales.idUsuario);
    if (resOrder) {
      setAllPedidosList(resOrder.pedidosSinRuta);
    } else {
      console.error('Error en getOrderList');
    }
    setLoading(false);
  };


  const moverPedido = (listaOrigen : OrderType[], listaDestino : OrderType[], idPedido : string) => {
    const pedido = listaOrigen.find(pedido => pedido.idPedido === idPedido);
    if (pedido) {
      listaOrigen.splice(listaOrigen.indexOf(pedido), 1);
      listaDestino.push(pedido);
    }
  };

  const addPedidoToRate = (objPedido : OrderType) => {
    moverPedido(allPedidosList, pedidosInRate, objPedido.idPedido);
    setAllPedidosList([...allPedidosList]);
    setPedidosInRate([...pedidosInRate]);
  };
  
  const removePedidoToRate = (objPedido : OrderType) => {
    moverPedido(pedidosInRate, allPedidosList, objPedido.idPedido);
    setPedidosInRate([...pedidosInRate]);
    setAllPedidosList([...allPedidosList]);
  };

  const navigationBack = () => {
    switch (screenLocal) {
      case 'data':
        setScreenShow('list')
        break;
      case 'pedidos':
        setScreenLocal('data')
        break;
      case 'repartidores':
        setScreenShow('pedidos')
        break;
      default:
        break;
    }
  }

  const navigationNext = () => {
    switch (screenLocal) {
      case 'data':
        setScreenLocal('pedidos')
        break;
      case 'pedidos':
        setScreenLocal('repartidores')
        break;
      case 'repartidores':
        callBackRate();
        break;
      default:
        break;
    }
  }

  return (
    <div className="nueva-ruta-container">
      <div className=" lista_container contracted">
         <HeaderSection
              title={"Nueva ruta"}
              actionBack={()=>navigationBack()}
          />
        {screenLocal == "data" ? (
          <FormularioDatos
            setFechaEntrega={(value) =>
              setDataForm({ ...dataForm, fechaEntrega: value })
            }
            setNombreRuta={(value) =>
              setDataForm({ ...dataForm, nombreRuta: value })
            }
            nombreRuta={dataForm.nombreRuta}
            fechaEntrega={dataForm.fechaEntrega}
            loading={fetching}
          />
        ) :screenLocal == "pedidos" ? (
          <>
            <FormularioPedidos pedidosList={allPedidosList} loading={loading}  onClickItem={addPedidoToRate}/>
          </>
        ):(
          <FormularioRepartidores/>
        )
      }
      </div>
      <div className="detalle-ruta-container">
        <DetallesRuta addOrRemoveOrder={removePedidoToRate} pedidosList={pedidosInRate} rateData={dataForm} />
        <div className="btn-nueva-ruta-container">
          <Buttons
            textColor={Colors().iztac}
            color={Colors().texotli300}
            text={screenLocal !== 'repartidores'?'Siguiente':'Crear Ruta'}
            loading={loading}
            type="primary"
            action={() =>navigationNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default NuevoRuta;
