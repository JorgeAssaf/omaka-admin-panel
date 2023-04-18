import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GetRepartidores, newRepartidor } from "../../api/repartidorQuery";
import { CardList } from "../../components/cardList/cards-list";
import HeaderSection from "../../components/header/headerSection";
import MapView from "../../components/map/MapView";
import { RootState } from "../../redux/reducers/mainReducer";
import { RepartidorType, RepartidorTypeForm } from "../../types/typeRepartidor";
import NuevoRepartidor from "../nuevoRepartidor/nuevo-repartidor";
import { PanelDeControl } from "../panel-de-control/panel-de-control";

import "./styles.css";
import { DetallesRepartidor } from "./detallesRepartidor";
import { PointType } from "../../types/typesMap";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { AppDispatch } from "../../redux/store";
import { getListaRepartidores } from "../../redux/actions";
import { OnboradingRepartidor } from "../../components/onboarding/onboarding-repartidor";
export const PanelRepartidores = () => {
  const [screenShow, setScreenShow] = useState("list");
  const [loading, setLoading] = useState(false);
  const [initOnboarding, setInitOnboarding] = useState(false);
  const [repartidor, setRepartidor] = useState<RepartidorType>(
    {} as RepartidorType
  );
  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const repartidorList = useSelector(
    (state: RootState) => state.repartidores.repartidorList
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getRepartidorList();
    getOnboardingData();
  }, []);

  const getOnboardingData = ( ) => {
    //hacer la peticion a las reducer y actualizar cuando lo cierre a la DB
    if(repartidorList.length > 0){
      setInitOnboarding(true);
    }
  }

  const getRepartidorList = async () => {
    setLoading(true);
    dispatch(getListaRepartidores(DatosPersonales.idUsuario));
    setLoading(false);
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

  useEffect(() => {
    let unsub = null as any;
    if(repartidor?.DatosPersonales?.idUsuario){
      unsub = onSnapshot(doc(db, "Repartidores",repartidor.DatosPersonales.idUsuario), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        setRepartidor(doc.data() as RepartidorType)
      });
    }
    return unsub;
  }, [repartidor]);

  return (
    <PanelDeControl currentSection="/panel/repartidores">
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
                  onClickItem={setRepartidor}
                  tipo="repartidor"
                  data={repartidorList}
                  activeItem={repartidor?.DatosPersonales?.idUsuario}
                />
              </div>
              <div className="mapa_container">
                <div className="card_detalles_ruta_float">
                  {repartidor?.DatosPersonales?.idUsuario && (
                    <div className="relative">
                      <DetallesRepartidor repartidor={repartidor} />
                    </div>
                  )}
                </div>
                {repartidor && !repartidor.Ubicacion?.latitude ?(
                  <div className='overflow full'>
                    <div className='withoutLocation'> Sin ubicacion</div>
                  </div>
                ):null}
                <MapView
                  points={[]}
                  repartidorFocus
                  repartidorUbicacion={repartidor?.Ubicacion}
                />
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
    <OnboradingRepartidor isOpen={initOnboarding} onCloseTour={()=>setInitOnboarding(false)}/>
    </PanelDeControl>
  );
};
