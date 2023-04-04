import { Close } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { newRate, tomarRutas } from "../../api/rateQuerys";
import { DetallesRutaCard } from "../../components/cardDetalleRuta/detalles-ruta-card";
import DetallesPedidoCard from "../../components/cardDetallesPedido/detalles-pedido-card";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { useIsVisible } from "../../hooks/useVisible";
import { RootState } from "../../redux/reducers/mainReducer";
import { ParentScreenProps } from "../../types/typeAtoms";
import { OrderType } from "../../types/typeOrders";
import { RateType, RateTypeFormSimple } from "../../types/typeRate";
import { PointType } from "../../types/typesMap";
import { getOderForID, getPointsORder } from "../../utils/pedidos";
import { getPointsRates } from "../../utils/rates";
import NuevaRuta from "../nuevaRuta/nueva-ruta";
import { PanelDeControl } from "../panel-de-control/panel-de-control";

import "./styles.css";
export function PanelRutas(){
  const [screenShow, setScreenShow] = useState("list");
  const [activeRateList, setActiveRateList] = useState<RateType[]>([]);
  const [historyRateList, setHistoryRateList] = useState<RateType[]>([]);
  const [loading, setLoading] = useState(false);
  const [rateSelected, setRateSelected] = useState({} as RateType);
  const [poinstRates, setPoinstRates] = useState({} as PointType[]);
  const [orderSelected, setOrderSelected] = useState({} as OrderType);
  const [repartidor, setRepartidor] = useState<RateType["repartidor"]>({} as RateType["repartidor"]);
  const { DatosPersonales } = useSelector((state: RootState) => state.user.userData as any);
  const orderWithRate = useSelector((state: RootState) => state.pedidos.orderListWithRate);

  const getRateList = async () => {
    setLoading(true);
    const reqBack = await tomarRutas(DatosPersonales.idUsuario, true);
    if (reqBack.status == "OK") {
      setActiveRateList(reqBack.activeRates);
      setHistoryRateList(reqBack.historyRates);
    }
    setLoading(false);
  };

  useEffect(() => {   
      getRateList();
  },[]);


  const newRateClient = async (rateData: RateTypeFormSimple) => {
    // setLoading(true);
    const creador = {
      name: DatosPersonales.nombre,
      id: DatosPersonales.idUsuario
    };
    const resRate = await newRate(rateData, creador, rateData.repartidor);
    getRateList();
    setLoading(false);
    setScreenShow("list");
    if (resRate.status == "OK") {
      toast.success("Ruta creada exitosamente!!");
    } else {
      toast.error("Algo paso mal");
      toast.error(resRate.errorMessage);
    }
  };

  const onSelectRate = (itemRate) => {
    setRateSelected(itemRate);
  };

  const getArrayPointsRates = () => {
    if (activeRateList.length > 0 && orderWithRate.length > 0) {
      const points = getPointsRates(activeRateList, orderWithRate);
      setPoinstRates(points);
    }
    else if (activeRateList.length == 0) {
      setPoinstRates([]);
    }
  };

  useEffect(() => {
    getArrayPointsRates();
  }, [activeRateList, orderWithRate]);

  const focusOrderMap = (item: OrderType) => {
    setOrderSelected(item);
    const points = getPointsORder([item]);
    setPoinstRates(points);
  };

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
                  actionBtnAdd={() => setScreenShow("new")}
                  typeOrderSet={() => null}
                />
              </div>
              <CardList
                loading={loading}
                onClickItem={(item) => onSelectRate(item)}
                cardProps={{ fullWidth: true }}
                tipo="rutas"
                data={activeRateList}
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
                    <DetallesPedidoCard {...orderSelected} />
                  </div>
                )}
                <div className="order_list_float_right">
                  <CardList
                    onClickItem={(item) => focusOrderMap(item)}
                    tipo="pedidos"
                    data={getOderForID(rateSelected.Pedidos, useSelector)}
                  />
                </div>
              </div>
              <MapView points={poinstRates} />
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
