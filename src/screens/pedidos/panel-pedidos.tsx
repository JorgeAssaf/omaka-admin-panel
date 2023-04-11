import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GetOrders, newOrder } from "../../api/ordersQuerys";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { getListaPedidos } from "../../redux/actions";
import { RootState } from "../../redux/reducers/mainReducer";
import { AppDispatch } from "../../redux/store";
import { ClientType, OrderType, OrderTypeForm } from "../../types/typeOrders";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import NuevoPedido from "./nuevo-pedido";
import "./styles.css";
import SuggerClientList from "../../components/suggerClientList/suggerClientList";

export const PanelPedidos = () => {
  const [screenShow, setScreenShow] = useState("list");
  const [loading, setLoading] = useState(false);
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const orderList = useSelector((state: RootState) => state.pedidos.orderList);
  const orderListRate = useSelector(
    (state: RootState) => state.pedidos.orderListWithRate
  );
  const [orderView, setOrderView] = useState(1);
  const [pedidosListMostrar, setPedidosListMostrar] = useState([]);
  const [direccionText, setDireccionText] = useState('');
  const [clientDetails, setClientDetails] = useState({} as ClientType);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    setPedidosListMostrar(
      orderView == 1 ? orderList : orderView == 2 ? orderListRate : []
    );
  }, [orderView, orderList, orderListRate]);

  const getOrderList = async () => {
    dispatch(getListaPedidos(DatosPersonales.idUsuario));
  };

  const newOrderClient = async (orderData: OrderTypeForm) => {
    setLoading(true);
    const resOrder = await newOrder(orderData, DatosPersonales.idUsuario, true);
    getOrderList();
    setLoading(false);
    setScreenShow("list");
    if (resOrder.status == "OK") {
      toast.success("Pedido creado exitosamente!!");
    } else {
      toast.error("Algo paso mal");
      toast.error(resOrder.errorMessage);
    }
    setDireccionText('');
    setClientDetails({} as ClientType)
  };


  return (
    <PanelDeControl currentSection='/panel/pedidos'>
      <div className="pedidos_container">
        <div
          className={
            screenShow == "new"
              ? " lista_container contracted"
              : "lista_container"
          }
        >
          <div className="header_container">
            <HeaderSection
              actionBack={
                screenShow != "list" ? () => setScreenShow("list") : undefined
              }
              title={screenShow == "list" ? "Pedidos" : "Nuevo pedido"}
              actionBtnAdd={
                screenShow == "list" ? () => setScreenShow("new") : undefined
              }
              pedidos={screenShow === "list"}
              typeOrder={orderView}
              typeOrderSet={setOrderView}
              lengths={{ uno: orderList.length, dos: orderListRate.length }}
            />
          </div>
          {screenShow == "list" ? (
            <CardList
              onClickItem={() => null}
              tipo="pedidos"
              data={
                orderView == 1 ? orderList : orderView == 2 ? orderListRate : []
              }
            />
          ) : (
            <NuevoPedido clientDetails={clientDetails} setDireccionText={setDireccionText} loading={loading} handleSubmit={newOrderClient} />
          )}
        </div>
        <div className={
          screenShow == 'new'
          ? "mapa_container contracted"
          : "mapa_container"
        }>
          <div className='order_list_float_right'>
            <SuggerClientList direccionText={direccionText} setClientDetails={setClientDetails} />
          </div>
          <MapView
            points={
              orderView == 1 ? orderList : orderView == 2 ? orderListRate : []
            }
            screenShow={screenShow}
          />
        </div>
        <ToastContainer
          limit={1}
          position="bottom-center"
          autoClose={3000}
          toastClassName="toast"
        />
      </div>
    </PanelDeControl>
  );
};
