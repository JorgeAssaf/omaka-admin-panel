import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { RootState } from "../../redux/reducers/mainReducer";
import { PanelDeControl } from "../panel-de-control/panel-de-control";

import "./styles.css";
import { AppDispatch } from "../../redux/store";
import { getListClients } from "../../redux/actions";
import { ClientType } from "../../types/typeOrders";
import { DetallesCliente } from "./detallesCliente";

export const PanelClientes = () => {
  const [screenShow, setScreenShow] = useState("list");
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState<ClientType>(
    {} as ClientType
  );
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const clientsList = useSelector(
    (state: RootState) => state.clientes.clientsList
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getClientsList();
  }, []);


  const getClientsList = async () => {
    setLoading(true);
    dispatch(getListClients(DatosPersonales.idUsuario));
    setLoading(false);
  };

  const getPoints = () => {
    if (cliente) {
      if(cliente.ubicacionPedido?.lat){
        console.log(cliente.ubicacionPedido);
        
        return [{ubicacionPedido:cliente.ubicacionPedido}];
      }else{
      return [];
      }
    } else {
      return  [];
    }
  };


  return (
    <PanelDeControl currentSection="/panel/clientes">
      <>
        {screenShow == "list" ? (
          <div className="repartidor_container">
            <div className="repartidor_view_container">
              <div className="lista_container">
                <div className="header_nav_form">
                  <HeaderSection
                    title={"Clientes"}
                  />
                </div>
                <CardList
                  onClickItem={setCliente}
                  tipo="cliente"
                  data={clientsList}
                  activeItem={cliente?.idCliente}
                />
              </div>
              <div className="mapa_container">
                <div className="card_detalles_ruta_float">
                  {cliente?.idCliente && (
                    <div className="relative">
                      <DetallesCliente cliente={cliente} />
                    </div>
                  )}
                </div>
                {cliente && !cliente.ubicacionPedido?.lat ?(
                  <div className='overflow full'>
                    <div className='withoutLocation'> Sin ubicacion</div>
                  </div>
                ):null}
                <MapView points={getPoints()} screenShow={screenShow} />
              </div>
            </div>
          </div>
        ) : (
          <div className="repartidor_container">
            {/* 
            Aqui va el modal para agregar un cliente nuevo
            */}
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
