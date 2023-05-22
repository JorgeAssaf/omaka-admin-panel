import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getListaPedidos,
  setListaRepartidores,
  setListaRutas
} from "../../redux/actions";
import { RateType } from "../../types/typeRate";
import RutaAnalitics from "./rutas-analitics";
import "./styles.css";
import OrderAnalitics from "./orders-analitics";
import { OrderType } from "../../types/typeOrders";
import { RepartidorType } from "../../types/typeRepartidor";
import { getOrdersOfRepartidor } from "../../utils/pedidos";
import RepartidorAnalitics from "./repartidor-analitics";
import { getTimeAndDistanceOfRate } from "../../utils/rates";

const AnaliticsContent = () => {
  const [loading, setLoading] = useState(false);
  const [ratesFinish, setRatesFinish] = useState([] as RateType[]);
  const [ratesInProgress, setRatesInProgress] = useState([] as RateType[]);
  const [ratesPendings, setRatesPendings] = useState([] as RateType[]);
  const [orderFinish, setOrderFinish] = useState([] as RateType[]);
  const [orderReport, setOrderReport] = useState([] as RateType[]);
  const [orderPendings, setOrderPendings] = useState([] as RateType[]);
  const [timeAndDistance, setTimeAndDistance] = useState([] as any); //crear type
  const [repartidoresAnalitics, setRepartidoresAnalitics] = useState([] as any); //crear un type nuevo

  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const activeRateList = useSelector(
    (state: RootState) => state.rutas.activeRates
  );
  const historyRateList = useSelector(
    (state: RootState) => state.rutas.historyRates
  );
  const orderList = useSelector((state: RootState) => state.pedidos.orderList);
  const orderListRate = useSelector(
    (state: RootState) => state.pedidos.orderListWithRate
  );
  const repartidorList = useSelector(
    (state: RootState) => state.repartidores.repartidorList
  );

  const dispatch = useDispatch<AppDispatch>();

  const getRateList = async () => {
    setLoading(true);
    dispatch(setListaRutas(DatosPersonales?.idUsuario));
    setLoading(false);
  };

  const getOrderList = async () => {
    dispatch(getListaPedidos(DatosPersonales?.idUsuario));
  };

  const getRepartidorList = async () => {
    setLoading(true);
    dispatch(setListaRepartidores(DatosPersonales.idUsuario));
    setLoading(false);
  };

  useEffect(() => {
    if (activeRateList.length === 0 && historyRateList.length === 0) {
      getRateList();
    }
    if (orderList.length === 0 && orderListRate.length === 0) {
      getOrderList();
    }
    if (repartidorList.length == 0) {
      getRepartidorList();
    }
    getRateAnalitics();
    getOrderAnalitics();
    getRepartidorAnalitics();
    getGeneralAnalitics();
  }, []);

  useEffect(() => {
    getRateAnalitics();
    getOrderAnalitics();
    getRepartidorAnalitics();
    getGeneralAnalitics();
  }, [activeRateList, orderList, repartidorList]);

  const getGeneralAnalitics = () => {
    setTimeAndDistance(getTimeAndDistanceOfRate(historyRateList, orderListRate));

  }

  const getRateAnalitics = () => {
    const allRates = [...activeRateList, ...historyRateList];
    setRatesFinish(
      allRates.filter((rate: RateType) => rate.status === "finish")
    );
    setRatesInProgress(
      allRates.filter((rate: RateType) => rate.status === "inProgres")
    );
    setRatesPendings(
      allRates.filter((rate: RateType) => rate.status === "pending")
    );
  };

  const getOrderAnalitics = () => {
    const allOrders = [...orderList, ...orderListRate];
    setOrderFinish(
      allOrders.filter((order: OrderType) => order.status === "finish")
    );
    setOrderReport(allOrders.filter((order: OrderType) => order.report));
    setOrderPendings(
      allOrders.filter((order: OrderType) => order.status === "pending")
    );
  };

  const getRepartidorAnalitics = () => {
    const repartidores = [] as any;
    repartidorList.forEach((repartidor: RepartidorType) => {
      const orderOfRepartidor = getOrdersOfRepartidor(
        [...activeRateList, ...historyRateList],
        [...orderList, ...orderListRate],
        repartidor.DatosPersonales.idUsuario
      );
      repartidores.push({
        nombre: repartidor.DatosPersonales.nombre,
        foto: repartidor.DatosPersonales.foto,
        idUsuario: repartidor.DatosPersonales.idUsuario,
        ...orderOfRepartidor
      });
    });
    setRepartidoresAnalitics(repartidores);
  };

  return (
    <div className="analitics-container">
        <div className='flex-row-start-start'>
            <RutaAnalitics
            title="Rutas"
            ratesFinish={ratesFinish.length}
            ratesInProgress={ratesInProgress.length}
            ratesPendings={ratesPendings.length}
            timeAndDistance={timeAndDistance}
        />
        <OrderAnalitics
            title="Pedidos"
            orderFinish={orderFinish.length}
            orderReport={orderReport.length}
            orderPendings={orderPendings.length}
        />
        </div>

      <RepartidorAnalitics repartidoresList={repartidoresAnalitics} />
    </div>
  );
};

export default AnaliticsContent;
