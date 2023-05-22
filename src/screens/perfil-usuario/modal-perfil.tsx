import React, { useRef, useState, useEffect } from "react";
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import { Close } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { UserType } from "../../types/typeUser";
import Typography from "../../components/atoms/typography";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Avatar from "../../components/atoms/avatar/avatarUser";
import LabelInput from "../../components/atoms/label-input";

type ModalPerfilProps = {
  onClose: any;
};

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 0
};

export const ModalPerfil = ({ onClose }: ModalPerfilProps) => {
  const { DatosPersonales, Nivel, Rutas, Repartidores } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const [dataProfile, setDataProfile] = useState(
    {} as UserType["DatosPersonales"]
  );
  const [disableInput, setDisabledInput] = useState(true);
  const [textButton, settextButton] = useState("Editar Perfil");
  
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    setDataProfile({ ...DatosPersonales });
  }, []);
  const editarCampo = () => {
    setDisabledInput(false);
    settextButton("Guardar");
    if (textButton == "Guardar") {
      setDisabledInput(true);
      settextButton("Editar perfil");
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <div className="modal-wrapper" ref={modalRef}>
        <button className="modal-close-button" onClick={() => onClose()}>
          <SvgIcon
            component={Close}
            fontSize="small"
            htmlColor={Colors().tizatl600}
          />
        </button>
        <div className="modal-content">
          <Avatar
            fullName={dataProfile.nombre}
            src={dataProfile.foto}
            uuid={dataProfile.idUsuario}
            size="large"
          />
          <div className="tipo-cuenta">
            <Typography variant="cardTitle" color={Colors().chalchihuitl400}>
              {Nivel.toLocaleUpperCase()}
            </Typography>
          </div>
          <div className="text-container">
            <LabelInput
              inputProps={{ disabled: disableInput }}
              value={dataProfile.nombre}
              onChange={(value) =>
                setDataProfile({ ...dataProfile, nombre: value })
              }
              label="Nombre"
              placeholder="Cual es tu nombre?"
            />
            <LabelInput
              inputProps={{ disabled: disableInput }}
              value={dataProfile.apellido}
              onChange={(value) =>
                setDataProfile({ ...dataProfile, apellido: value })
              }
              label="Apellido"
              placeholder="Cual es tu apellido?"
            />
            <LabelInput
              inputProps={{ disabled: true }}
              value={dataProfile.correo}
              onChange={(value) =>
                setDataProfile({ ...dataProfile, correo: value })
              }
              label="Correo"
              placeholder="Cual es tu correo?"
            />
            <LabelInput
              inputProps={{ disabled: true }}
              value={dataProfile.nombreEmpresa}
              onChange={(value) =>
                setDataProfile({ ...dataProfile, nombreEmpresa: value })
              }
              label="Empresa"
              placeholder="Como se llama tu negocio o empresa?"
            />
            <LabelInput
              inputProps={{ disabled: disableInput }}
              value={dataProfile.direccionEmpresa}
              onChange={(value) =>
                setDataProfile({ ...dataProfile, direccionEmpresa: value })
              }
              label="Direccion de empresa"
              placeholder="Dirección de empresa"
            />
          </div>
          <Buttons
            action={() => editarCampo()}
            text={textButton}
            type="primary"
            color={Colors().akostik200}
            textColor={Colors().tizatl600}
          />
        </div>
      </div>
    </div>
  );
};
