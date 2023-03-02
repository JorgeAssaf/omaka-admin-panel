import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { newRate } from "../../api/rateQuerys";
import { GetRepartidores, newRepartidor } from "../../api/repartidorQuery";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { RootState } from "../../redux/reducers/mainReducer";
import { RateType, RateTypeForm } from "../../types/typeRate";
import { RepartidorType, RepartidorTypeForm } from "../../types/typeRepartidor";
import NuevaRuta from "../nuevaRuta/nueva-ruta";
import NuevoRepartidor from "../nuevoRepartidor/nuevo-repartidor";

import "./styles.css";
export const PanelRepartidores = () => {
  const [screenShow, setScreenShow] = useState("list");
  const [repartidorList, setRepartidorList] = useState<RepartidorType[]>([]);
  const [loading, setLoading] = useState(false);
  const [repartidor, setRepartidor] = useState<RepartidorType>(
    {} as RepartidorType
  );
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );

  useEffect(() => {
    getRepartidorList();
  }, []);

  const getRepartidorList = async () => {
    const resBack = await GetRepartidores(DatosPersonales.idUsuario);
    if (resBack) {
      setRepartidorList(resBack);
    } else {
      console.error('Error en getOrderList');
    }
  };
 

  const newRepartidorClient = async (repartidorData: RepartidorTypeForm) => {
    setLoading(true);

    const resRate = await newRepartidor(
      repartidorData,
      DatosPersonales.idUsuario
    );
    getRepartidorList();
    setLoading(false);
    setScreenShow("list");
    if (resRate.status == "OK") {
      toast.success("Repartidor creado exitosamente!!");
    } else {
      toast.error("Algo paso mal");
      toast.error(resRate.errorMessage);
    }
  };

  return (
    <>
      {screenShow == "list" ? (
        <div className="repartidor_container">
          <div className="repartidor_view_container">
            <div className="lista_container">
              <div className="header_nav_form">
                <HeaderSection
                  title={"Repartidores"}
                  actionBtnAdd={() => setScreenShow("new")}
                />
              </div>
              <CardList
                onClickItem={() => null}
                tipo="repartidor"
                data={repartidorList}
              />
            </div>
            <div className="mapa_container">
              <MapView points={[]} />
            </div>
          </div>
        </div>
      ) : (
        <div className="repartidor_container">
          <NuevoRepartidor
            handleSubmit={newRepartidorClient}
            loading={loading}
            setScreenShow={setScreenShow}
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
  );
};
