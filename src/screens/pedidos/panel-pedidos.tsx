import { useState, useEffect } from "preact/hooks";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  GetOrders,
  deleteOrder,
  editOrder,
  newOrder
} from "../../api/ordersQuerys";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { getListaPedidos } from "../../redux/actions";
import { RootState } from "../../redux/reducers/mainReducer";
import { AppDispatch } from "../../redux/store";
import { ClientType, OrderType, OrderTypeForm } from "../../types/typeOrders";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import { DetallesPedidos } from "./detalles-pedido";
import { Drawer, SvgIcon } from "@mui/material";
import NuevoPedido from "./nuevo-pedido";
import "./styles.css";
import SuggerClientList from "../../components/suggerClientList/suggerClientList";
import { OnboradingPedidos } from "../../components/onboarding/onboarding-pedidos";
import { Close } from "@mui/icons-material";
import DetallesPedidoCard from "../../components/cardDetallesPedido/detalles-pedido-card";
import Colors from "../../utils/colors";
import { Buttons } from "../../components/atoms/buttons";

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
  const [direccionText, setDireccionText] = useState("");
  const [clientDetails, setClientDetails] = useState({} as ClientType);
  const [initOnboarding, setInitOnboarding] = useState(false);
  const [datosPedido, setDatosPedido] = useState({} as OrderType);
  const [isEditPedido, setIsEditPedido] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);
  const [legthFinishOrders, setLegthFinishOrders] = useState(0);
  const [legthStoppedOrders, setLegthStoppedOrders] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getOrderList();
    getOnboardingData();
  }, []);

  const getOnboardingData = () => {
    setInitOnboarding(true);
  };

  useEffect(() => {
    const ordersToShow = getOrderToShow();
    setPedidosListMostrar(ordersToShow);

  }, [orderView, orderList, orderListRate]);

  const getOrderToShow = () => {
    let listToShow = [];
    switch (orderView) {
      case 1:
        listToShow = orderList;
        break;
      case 2:
        listToShow = orderListRate;
        break;
      case 3:
        listToShow = orderListRate.filter((order) => order.status == "finish");
        break;
      case 4:
        listToShow = orderListRate.filter((order) => order.report);
        break;
      default:
        break;
    }
    setLegthFinishOrders(orderListRate.filter((order) => order.status == "finish").length);
    setLegthStoppedOrders(orderListRate.filter((order) => order.report).length);
    return (listToShow);
  }

  const getOrderList = async () => {
    dispatch(getListaPedidos(DatosPersonales?.idUsuario));
  };

  const newOrderClient = async (orderData: OrderTypeForm) => {
    setLoading(true);
    const resOrder = await newOrder(
      orderData,
      DatosPersonales?.idUsuario,
      true
    );

    setLoading(false);
    setScreenShow("list");
    if (resOrder.status == "OK") {
      toast.success("Pedido creado exitosamente!!");
    } else {
      toast.error("Algo salio mal");
      toast.error(resOrder.errorMessage);
    }
    setDireccionText("");
    setClientDetails({} as ClientType);
  };

  const editOrderClient = async (orderData: OrderTypeForm) => {
    setLoading(true);
    const resOrder = await editOrder(
      orderData,
      datosPedido.idPedido,
      DatosPersonales?.idUsuario,
      true
    );

    setLoading(false);
    setScreenShow("list");
    if (resOrder.status == "OK") {
      toast.success("Pedido editado exitosamente!!");
    } else {
      toast.error("Algo salio mal");
    }
    setDireccionText("");
    setClientDetails({} as ClientType);
  };

  const eliminarPedido = async () => {
    try {
      let respuesta = await deleteOrder(
        datosPedido,
        DatosPersonales?.idUsuario,
        true
      );
      if (respuesta.status == "OK") {
        toast.success("Pedido eliminado");

      } else {
        toast.success("Ocurrió un error");
      }
      setIsEditPedido(false);
      setDatosPedido({} as OrderType);
      setClientDetails({} as ClientType);
      setDireccionText("");
      setClientDetails({} as ClientType);
    } catch (err) {
      toast.success("Ocurrió un error");
      console.log(err);
    }
  };

  const onClickPedido = (e) => {
    setDatosPedido(e);
    setShowDetalles(true);
  };

  const editPedido = () => {
    setIsEditPedido(true);
    setShowDetalles(false);
    setScreenShow("new");
  };

  const getPoints = () => {
    if (datosPedido.idPedido) {
      return [{ ubicacionPedido: datosPedido.ubicacionPedido }];
    } else {
      const ordersToShow = getOrderToShow();
      return ordersToShow ? ordersToShow : [];
    }
  };

  const backToList = () => {
    setScreenShow("list");
    setIsEditPedido(false);
    setDatosPedido({} as OrderType);
    setClientDetails({} as ClientType);
    setDireccionText("");
  };

  return (
    <PanelDeControl currentSection="/panel/pedidos">
      <div className="pedidos_container">
        <div
          className={
            screenShow == "new"
              ? " lista_container contracted"
              : "lista_container onboarding-pedido-list"
          }
        >
          <div className="header_container">
            <HeaderSection
              actionBack={screenShow != "list" ? backToList : undefined}
              title={screenShow == "list" ? "Pedidos" : "Nuevo pedido"}
              actionBtnAdd={
                screenShow == "list" ? () => setScreenShow("new") : undefined
              }
              pedidos={screenShow === "list"}
              typeOrder={orderView}
              typeOrderSet={setOrderView}
              lengths={{ uno: orderList.length, dos: orderListRate.length, tres: legthFinishOrders, cuatro: legthStoppedOrders }}
            />
          </div>
          {screenShow == "list" ? (
            <CardList
              onClickItem={onClickPedido}
              tipo="pedidos"
              activeItem={datosPedido.idPedido}
              data={pedidosListMostrar}
            />
          ) : (
            <NuevoPedido
              clientDetails={clientDetails}
              setDireccionText={setDireccionText}
              loading={loading}
              handleSubmit={(pedido, isEditPedido) => {
                if (isEditPedido) {
                  editOrderClient(pedido);
                } else {
                  newOrderClient(pedido);
                }
              }}
              datosPedido={datosPedido}
              isEditPedido={isEditPedido}
            />
          )}
        </div>
        <div
          className={
            screenShow == "new"
              ? "mapa_container contracted"
              : "mapa_container onboarding-mapa"
          }
        >
          <div className="order_list_float_right">
            <SuggerClientList
              direccionText={direccionText}
              setClientDetails={setClientDetails}
            />
          </div>
          <div className="card_detalles_ruta_float">
            {!!datosPedido.idPedido && showDetalles ? (
              <DetallesPedidos
                datosPedido={datosPedido}
                onClose={() => setDatosPedido({} as OrderType)}
                eliminateAction={() => eliminarPedido()}
                editarAction={editPedido}
              />
            ) : null}
          </div>
          <MapView points={getPoints()} screenShow={screenShow} />
        </div>

        <ToastContainer
          limit={1}
          position="bottom-center"
          autoClose={3000}
          toastClassName="toast"
        />
      </div>
      {/* <OnboradingPedidos
        isOpen={initOnboarding}
        onCloseTour={() => setInitOnboarding(false)}
      /> */}
    </PanelDeControl>
  );
};
