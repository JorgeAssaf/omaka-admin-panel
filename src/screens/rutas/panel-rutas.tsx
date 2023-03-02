import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { newRate } from "../../api/rateQuerys";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { RootState } from "../../redux/reducers/mainReducer";
import { RateType, RateTypeForm } from "../../types/typeRate";
import NuevaRuta from "../nuevaRuta/nueva-ruta";

import "./styles.css";
export const PanelRutas = () => {
  const [screenShow, setScreenShow] = useState("list");
  const [orderList, setOrderList] = useState<RateType[]>([]);
  const [loading, setLoading] = useState(false);
  const [repartidor, setRepartidor] = useState<RateType["repartidor"]>(
    {} as any
  );
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );



  const getRateList = () => {

  };

  const newRateClient = async (rateData: RateTypeForm) => {
    console.log("rateData",rateData);
    
    // setLoading(true);
    const creador = {
      name: DatosPersonales.nombre,
      id: DatosPersonales.idUsuario
    };
    const resRate = await newRate(rateData, creador, rateData.repartidor);
    // getRateList();
    // setLoading(false);
    // setScreenShow("list");
    // if (resRate.status == "OK") {
    //   toast.success("Pedido creado exitosamente!!");
    // } else {
    //   toast.error("Algo paso mal");
    //   toast.error(resRate.errorMessage);
    // }
  };

  return (
    <>
      {screenShow == "list" ? (
        <div className="rutas_container">
          <div className="rutas_view_container">
            <div className="lista_container">
            <div className="header_container">
            <HeaderSection
              title={"Rutas"}
              actionBtnAdd={()=>setScreenShow("new")}
            />
          </div>
              {/* <CardList onClickItem={()=>null} tipo="rutSas" data={orderList} /> */}
            </div>
            <div className="mapa_container">
              {/* <MapView points={arrayPed}/> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="rutas_container">
          <NuevaRuta setScreenShow={setScreenShow} loading={loading} handleSubmit={newRateClient} />
        </div>
      )}
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </>
  );
};
