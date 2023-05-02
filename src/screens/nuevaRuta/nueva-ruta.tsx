import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetOrders } from "../../api/ordersQuerys";
import { GetRepartidores } from "../../api/repartidorQuery";
import { Buttons } from "../../components/atoms/buttons";
import HeaderSection from "../../components/header/headerSection";
import { RootState } from "../../redux/reducers/mainReducer";
import { OrderType } from "../../types/typeOrders";
import { RateType, RateTypeFormSimple } from "../../types/typeRate";
import { RepartidorType } from "../../types/typeRepartidor";
import Colors from "../../utils/colors";
import { getIdPedidos } from "../../utils/pedidos";
import { DetallesRuta } from "../rutas/detalles-ruta";
import FormularioDatos from "./formulario-datos";
import { FormularioPedidos } from "./formulario-pedidos";
import { FormularioRepartidores } from "./formulario-repartidores";
import './styles.css';
import { getListaRepartidores } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";

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
  const [dataForm, setDataForm] = useState <RateType & RateTypeFormSimple >({} as RateType & RateTypeFormSimple );
  const {DatosPersonales} = useSelector((state: RootState) => state.user.userData as any);
  const allRepartidoresList = useSelector((state: RootState) => state.repartidores.repartidorList);
  const dispatch = useDispatch<AppDispatch>();
  const callBackRate = () => {
    if(dataForm.nombreRuta && dataForm.fechaEntrega){
      handleSubmit(dataForm);
    }else{
      toast.error('Llena todos los campos')
    }
  }
  
  useEffect(() => {
    getOrderList();
    getRepartidoresList();
  }, [])
  

  const getOrderList = async () => {
    setLoading(true);
    const resOrder = await GetOrders(DatosPersonales?.idUsuario);
    if (resOrder) {
      setAllPedidosList(resOrder.pedidosSinRuta);
    } else {
      console.error('Error en getOrderList');
    }
    setLoading(false);
  };


    const getRepartidoresList = async () => {
    setLoading(true);
    dispatch(getListaRepartidores(DatosPersonales?.idUsuario));
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
    setDataForm({
      ...dataForm,
      Pedidos:getIdPedidos([...pedidosInRate])
    })
  };
  
  const removePedidoToRate = (objPedido : OrderType) => {
    moverPedido(pedidosInRate, allPedidosList, objPedido.idPedido);
    setPedidosInRate([...pedidosInRate]);
    setAllPedidosList([...allPedidosList]);
  };

  const addRepartidoresToRate = (repartidor: RepartidorType) => {
    const idRepartidor = repartidor.DatosPersonales.idUsuario;
    if(idRepartidor){
      setDataForm({
        ...dataForm,
        repartidor:{
          id:idRepartidor,
          name:repartidor.DatosPersonales.nombre,
          foto:repartidor.DatosPersonales.foto,
        }
      })
    }
  }

  const navigationBack = () => {
    switch (screenLocal) {
      case 'data':
        setScreenShow('list')
        break;
      case 'pedidos':
        setScreenLocal('data')
        break;
      case 'repartidores':
        setScreenLocal('pedidos')
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
          <FormularioRepartidores repartidoresList={allRepartidoresList} loading={loading} onClickItem={addRepartidoresToRate} />
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
