import { ArrowDropDown, Close, MoveDown } from "@mui/icons-material";
import { Alert, SvgIcon } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { orderOrdersPerDistance } from "../../api/ordersQuerys";
import { newRate } from "../../api/rateQuerys";
import { DetallesRutaCard } from "../../components/cardDetalleRuta/detalles-ruta-card";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapViewRoutes from "../../components/map/mapRoutesView";
import { RootState } from "../../redux/reducers/mainReducer";
import { OrderType } from "../../types/typeOrders";
import { RateType, RateTypeFormSimple } from "../../types/typeRate";
import { PointType } from "../../types/typesMap";
import { getOderForID, getPointsOrder } from "../../utils/pedidos";
import NuevaRuta from "../nuevaRuta/nueva-ruta";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import { doc, onSnapshot } from 'firebase/firestore';
import "./styles.css";
import ModalDetallesPedido from "../../components/modalDetallesPedido/modal-detalles-pedido";
import { getListaPedidos, setListaRepartidores, setListaRutas } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import { db } from "../../utils/firebase";
import { isFreePeriod } from "../../utils/dateAndTime";
import { getUser } from "../../api/userQuerys";
import { getAuth, signOut } from "firebase/auth";
import { converRepartidorToLocation } from "../../utils/locations";

export function PanelRutas(){
  const [screenShow, setScreenShow] = useState("list");
  const [loading, setLoading] = useState(false);  
  const [rateSelected, setRateSelected] = useState({} as RateType);
  const [poinstRates, setPoinstRates] = useState([] as PointType[]);
  const [orderSelected, setOrderSelected] = useState({} as OrderType);
  const [repartidor, setRepartidor] = useState({} as any);
  const { DatosPersonales } = useSelector((state: RootState) => state.user.userData as any);
  const orderWithRate = useSelector((state: RootState) => state.pedidos.orderListWithRate);
  const orderList = useSelector((state: RootState) => state.pedidos.orderList);
  const repartidorList = useSelector((state: RootState) => state.repartidores.repartidorList);
  const activeRateList = useSelector((state: RootState) => state.rutas.activeRates);
  const dispatch = useDispatch<AppDispatch>();

  const getRateList = async () => {
    setLoading(true);
    dispatch(setListaRutas(DatosPersonales?.idUsuario));
    setLoading(false);
  };

  useEffect(() => {   
      getRateList();
      checkFreeTrial();
      getRepartidorList();
  },[]);

  useEffect(()=> {
    if(orderList.length == 0 &&orderWithRate.length === 0 ){
      getPedidos();
    }
  },[])

 
  const getRepartidorList = async () => {
    dispatch(setListaRepartidores(DatosPersonales?.idUsuario));
  };

  const getPedidos = () => {
    dispatch(getListaPedidos(DatosPersonales?.idUsuario));
  }

  useEffect(()=>{
    getOrdersOrdenate();  
  },[rateSelected])

  const getOrdersOrdenate = async()=>{
    try {
      if(rateSelected.idRuta){
        const pedidosArray=getOderForID(rateSelected.Pedidos, orderWithRate);
        const rest= await orderOrdersPerDistance(pedidosArray,pedidosArray[0].ubicacionPedido)
        const points = getPointsOrder(rest);
        setPoinstRates(points);
      }
    }catch(err){
      console.error(err)
    }
  }

  const checkFreeTrial = async() => {
    const userData = await getUser(getAuth().currentUser?.uid);
    if(userData){
      if(userData.DatosPersonales.status == 0){
        if(!isFreePeriod(userData.DatosPersonales.fechaCreacion,userData.DatosPersonales.trialEndDate)){
          toast.error('Tu periodo de prueba ah vencido');
          setTimeout(() => {
            signOut(getAuth());
          }, 4000);
        }
      }
    }
  }

  useEffect(() => {
    let unsub = null as any;
    if(rateSelected.idRuta){
      unsub = onSnapshot(doc(db, "Repartidores",rateSelected.repartidor.id), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        setRepartidor(doc.data())
      });
    }
    return unsub;
  }, [rateSelected]);

  const newRateClient = async (rateData: RateTypeFormSimple) => {
    // setLoading(true);
    const creador = {
      name: DatosPersonales?.nombre,
      id: DatosPersonales?.idUsuario
    };
    const resRate = await newRate(rateData, creador, rateData.repartidor);
    getPedidos();
    getRateList();
    setLoading(false);
    setScreenShow("list");
    if (resRate.status == "OK") {
      toast.success("Ruta creada exitosamente!!");
    } else {
      toast.error("Ha ocurrido un error, intente de nuevo");
      toast.error(resRate.errorMessage);
    }
  };

  const onSelectRate = (itemRate) => {
    setRateSelected(itemRate);
  };

  const focusOrderMap = (item: OrderType) => {
    setOrderSelected(item);
    const points = getPointsOrder([item]);
    setPoinstRates(points);
  };


  const addNewRateBtn = () => {
   if(orderList.length == 0 &&orderWithRate.length === 0 ){
    toast.warning("Necesitas crear primero un pedido");
   }else if(repartidorList.length == 0) {
    toast.warning("Necesitas crear por lo menos un repartidor");
   }
   else{
    setScreenShow("new")
   }
  }

  return (
    <PanelDeControl currentSection='/panel/rutas'>
    <>
      {screenShow == "list" ? (
        <div className="rutas_container">
          <div className="rutas_view_container">
            <div className="lista_container">
              <div className="header_container">
                <HeaderSection
                  title={"Rutas"}
                  actionBtnAdd={() => addNewRateBtn()}
                  typeOrderSet={() => null}
                />
              </div>
              <CardList
                loading={loading}
                onClickItem={(item) => onSelectRate(item)}
                activeItem={rateSelected.idRuta}
                cardProps={{ fullWidth: true }}
                tipo="rutas"
                data={[...activeRateList]}
              />
            </div>
            <div className="mapa_container">
              <div className="card_detalles_ruta_float">
                {rateSelected.idRuta && (
                  <div className="relative">
                    <div
                      onClick={() => {
                        setRateSelected({} as RateType);
                        setOrderSelected({} as OrderType);
                      }}
                      className="closeBtn float circle"
                    >
                      <SvgIcon component={Close} fontSize="small" />
                    </div>
                    <DetallesRutaCard {...rateSelected} />
                  </div>
                )}
                 {orderSelected.idPedido && (
                  <div className="relative">
                    <div
                      onClick={() => setOrderSelected({} as OrderType)}
                      className="closeBtn float circle"
                    >
                      <SvgIcon component={Close} fontSize="small" />
                    </div>
                    <ModalDetallesPedido order={orderSelected} onClose={()=>setOrderSelected({} as OrderType)} />
                  </div>
                )}
              </div>
              <div className="order_list_float_right">
                  <CardList
                    onClickItem={(item) => focusOrderMap(item)}
                    tipo="pedidos"
                    data={getOderForID(rateSelected.Pedidos, orderWithRate)}
                  />
                </div>
                <div className='scroll-icon float down'>
                    <SvgIcon component={ArrowDropDown} fontSize="large" />
                </div>
                <MapViewRoutes points={poinstRates} repartidorUbicaciones={converRepartidorToLocation([repartidor])}/>
            </div>
          </div>
        </div>
      ) : (
        <div className="rutas_container">
          <NuevaRuta
            setScreenShow={setScreenShow}
            fetching={loading}
            handleSubmit={newRateClient}
          />
        </div>
      )}
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </>
    </PanelDeControl>
  );
};
