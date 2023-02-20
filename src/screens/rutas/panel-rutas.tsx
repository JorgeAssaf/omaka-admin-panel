import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { newRate } from "../../api/rateQuerys";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import { RootState } from "../../redux/reducers/mainReducer";
import { RateType, RateTypeForm } from "../../types/typeRate";
import NuevaRuta from "./nueva-ruta";

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
    <div className="rutas_container">
      <div className="header_container">
        <HeaderSection
          actionBack={
            screenShow != "list" ? () => setScreenShow("list") : undefined
          }
          title={screenShow == "list" ? "Rutas" : "Nueva Ruta"}
          actionBtnAdd={
            screenShow == "list" ? () => setScreenShow("new") : undefined
          }
        />
      </div>
      {screenShow == "list" ? (
        <div className='rutas_view_container'>
          <div className="lista_container">
            <CardList tipo="rutas" data={data} />
          </div>
          <div className="mapa_container">
              <img
                style={{ width: "100%" }}
                src="https://cdn-3.expansion.mx/dims4/default/b77fb0a/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2012%2F06%2F20%2Ftrafico-transito-google-maps-ciudad-de-mexico.jpg"
              />
          </div>
        </div>
      ) : (
        <NuevaRuta loading={loading} handleSubmit={newRateClient} />
      )}

      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </div>
  );
};
