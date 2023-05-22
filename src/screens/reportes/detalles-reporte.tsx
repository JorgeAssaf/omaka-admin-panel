import {Close} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/atoms/loading";
import HeaderSection from "../../components/header/headerSection";
import { RootState } from "../../redux/reducers/mainReducer";
import { RateType } from "../../types/typeRate";

import "./styles.css";
import { PointType } from "../../types/typesMap";
import { getPointsRates } from "../../utils/rates";
import MapView from "../../components/map/MapView";
import { OrderType } from "../../types/typeOrders";
import ItemOrderTable from "../../components/atoms/ItemOrderTable";
import { DetallesRutaCard } from "../../components/cardDetalleRuta/detalles-ruta-card";
import { SvgIcon } from "@mui/material";
import DetallesPedidoCard from "../../components/cardDetallesPedido/detalles-pedido-card";
import Typography from "../../components/atoms/typography";

type DetallesReporteProps = {
  rate: RateType;
  setRateDetails: () => void;
};
type OrderListTypes = {
  orderList: OrderType[];
  rate: RateType;
  setOrderDetails: (rate: OrderType) => void;
};

const DetallesReporte = ({ rate, setRateDetails }: DetallesReporteProps) => {
  const [loading, setLoading] = useState(false);
  const [poinstRates, setPoinstRates] = useState({} as PointType[]);
  const [orders, setOrders] = useState([] as OrderType[]);
  const [orderDetails, setOrderDetails] = useState({} as OrderType);

  const orderWithRate = useSelector(
    (state: RootState) => state.pedidos.orderListWithRate
  );
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  useEffect(() => {
    getArrayPointsRates();
    getOrders();
  }, [rate]);

  const getArrayPointsRates = () => {
    if (rate && orderWithRate.length > 0) {
      const points = getPointsRates([rate], orderWithRate);
      setPoinstRates(points);
    }
  };

  const getOrders = () => {    
    if(rate.Pedidos){
        const newOrderList = orderWithRate.filter((item)=> rate.Pedidos?.includes(item.idPedido));
        setOrders(newOrderList);
    }else{
      setOrders([]);
    }
  }

  if (loading) {
    return (
      <div className="full-container center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="detalles-reportes-container">
      <div className="detalles-reporte-info">
        <div className="header_container">
          <HeaderSection
            actionBack={() => setRateDetails()}
            title={"Detalles reporte"}
            typeOrderSet={() => null}
          />
        </div>
        <Typography variant="cardTitle" >
          Lista de pedidos
        </Typography>
        <OrderList rate={rate} orderList={orders}  setOrderDetails={setOrderDetails} />
      </div>
      <div className="detalles-reporte-maps">
      <div className="card_detalles_ruta_float">
          {rate.idRuta && (
            <div className="relative">
              <DetallesRutaCard {...rate} />
            </div>
          )}
          {orderDetails.idPedido && (
            <div className="relative">
              <div
                onClick={() => setOrderDetails({} as OrderType)}
                className="closeBtn float circle"
              >
                <SvgIcon component={Close} fontSize="small" />
              </div>
              <div className='order-detalles-reporte'>
                <DetallesPedidoCard {...orderDetails} />
              </div>
            </div>
          )}  
        </div>
        {poinstRates.length > 0 && <MapView points={poinstRates} />}
      </div>
    </div>
  );
};

const OrderList = ({rate, orderList, setOrderDetails }: OrderListTypes) => {
  
  return (
    <div className="table-container">
      <div className="header-table-container">
        <p className="table-child-header small left">ID</p>
        <p className="table-child-header left ">Cliente</p>
        <p className="table-child-header left ">Domicilio</p>
        <p className="table-child-header small left">Tiempo</p>
        <p className="table-child-header small ">Status</p>
        <p className="table-child-header small right">Setting</p>
      </div>
      {orderList.map((order) => (
        <ItemOrderTable fechaInicio={rate.fechaInicio} datosRow={order} setOrderDetails={setOrderDetails} />
      ))}
    </div>
  );
};

export default DetallesReporte;
