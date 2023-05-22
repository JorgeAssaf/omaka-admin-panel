import React, { useState, useEffect } from "react";
import Avatar from "../../components/atoms/avatar/avatarUser";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/mainReducer";
import "./styles.css";
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import { DescripcionPlan } from "./descripcion-plan";
import { ModalContrata } from "./modal-contrata";
import LabelInput from "../../components/atoms/label-input";
import { UserType } from "../../types/typeUser";
import Typography from "../../components/atoms/typography";
import { DeliveryDining, Email, PersonPin, Phone } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import { IconText } from "../../components/atoms/iconText";
import DatosCard from "../../components/generalCards/profile-card";
import SuscriptionCard from "../../components/generalCards/suscription-card";
import AnaliticsContent from "../../components/analitics";
import { ModalPerfil } from "./modal-perfil";

export const EditarPerfilUsuario = () => {
  const { DatosPersonales, Nivel, Rutas, Repartidores } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const auth = getAuth();
  const dispatch = useDispatch();

  const [disableInput, setDisabledInput] = useState(true);
  const [textButton, settextButton] = useState("Editar Perfil");
  const [openModal, setOpenModal] = useState(false);
  const [openModalPerfil, setOpenModalPerfil] = useState(false);

  const [dataProfile, setDataProfile] = useState(
    {} as  UserType["DatosPersonales"]
  );
  const [metricaDatos, setMetricaDatos] = useState({
    rutas: [],
    repartidores: []
  });

  useEffect(() => {
    setDataProfile({ ...DatosPersonales });
  }, []);

  useEffect(() => {
    setMetricaDatos({
      rutas: Rutas,
      repartidores: Repartidores ? Repartidores : 0
    });
  }, [Rutas, Repartidores]);

  const editarCampo = () => {
    setDisabledInput(false);
    settextButton("Guardar");
    if (textButton == "Guardar") {
      setDisabledInput(true);
      settextButton("Editar perfil");
    }
  };

  const getAnalitics = () => {

  }
 

  return (
    <PanelDeControl currentSection="/panel/profile">
      <div className="perfil-container">
        <div className='perfil-section analitics'>
        <AnaliticsContent/>
        </div>
        <div className='perfil-section data'>
          <DatosCard onClick={() => setOpenModalPerfil(true)} dataProfile={dataProfile} />
          <SuscriptionCard onCallback={() => setOpenModal(true)} Nivel={Nivel} dataProfile={dataProfile} />
        </div>
        {openModal ? <ModalContrata onClose={() => setOpenModal(false)} nivel={Nivel} /> : null}
        {openModalPerfil ? <ModalPerfil onClose={() => setOpenModalPerfil(false)} /> : null}
      </div>
    </PanelDeControl>
  );
};
