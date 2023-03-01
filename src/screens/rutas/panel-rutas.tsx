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
  const arrayPed=[{ubicacionPedido:{lat:20.67171803720562,lng:-103.47215320422521}},{ubicacionPedido:{lat:20.69271803720562,lng:-103.47215320422521}},{ubicacionPedido:{lat:20.57171803720562,lng:-103.47215320422521}}]

  const data = [
    {
      idPedido: "14-1317321",
      status: "Entregado",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20,
      distancia: "20km."
    },
    {
      idPedido: "14-1317321",
      status: "Pendiente",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20
    },
    {
      idPedido: "14-1317321",
      status: "Entregado",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20,
      distancia: "20km."
    },
    {
      idPedido: "14-1317321",
      status: "Pendiente",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20
    }
  ];

  const getRateList = () => {};

  const newRateClient = async (rateData: RateTypeForm) => {
    setLoading(true);
    const creador = {
      name: DatosPersonales.nombre,
      id: DatosPersonales.idUsuario
    };
    const resRate = await newRate(rateData, creador, repartidor);
    getRateList();
    setLoading(false);
    setScreenShow("list");
    if (resRate.status == "OK") {
      toast.success("Pedido creado exitosamente!!");
    } else {
      toast.error("Algo paso mal");
      toast.error(resRate.errorMessage);
    }
  };

  return (
    <>
      {screenShow == "list" ? (
        <div className="rutas_container">
         <div className="header_container">
            <HeaderSection
              title={"Rutas"}
              actionBtnAdd={()=>setScreenShow("new")}
            />
          </div>

          <div className="rutas_view_container">
            <div className="lista_container">
              <CardList onClickItem={()=>null} tipo="rutas" data={data} />
            </div>
            <div className="mapa_container">
              <MapView points={arrayPed}/>
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
