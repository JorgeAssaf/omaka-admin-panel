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
import { DeliveryDining, PersonPin } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export const EditarPerfilUsuario = () => {
  const { DatosPersonales, Nivel, Rutas, Repartidores } =
    useSelector((state: RootState) => state.user.userData as any);
  const auth = getAuth();
  const dispatch = useDispatch();


  const [disableInput, setDisabledInput] = useState(true);
  const [textButton, settextButton] = useState("Editar Perfil");
  const [openModal, setOpenModal] = useState(false);
  const [dataProfile, setDataProfile] = useState(
    {} as UserType["DatosPersonales"]
  );
  const [metricaDatos, setMetricaDatos] = useState({rutas: 0, repartidores: 0});

  useEffect(() => {
    setDataProfile({ ...DatosPersonales });
  }, []);

  useEffect(() => {
    setMetricaDatos({rutas: Rutas, repartidores:Repartidores ? Repartidores : 0 });
  }, [Rutas, Repartidores]);


  const editarCampo = () => {
    setDisabledInput(false);
    settextButton("Guardar");
    if (textButton == "Guardar") {
      setDisabledInput(true);
      settextButton("Editar perfil");
    }
  };

  return (
    <div className="perfil-container">
      <div className="column derecha">
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/omaka-app.appspot.com/o/Patterns%20-%206x6%20(10).png?alt=media&token=817c18a2-d4ac-45f8-ae7e-061fc0d99668"
          size="large"
        />
        <div className="tipo-cuenta">
            <Typography variant="cardTitle" color={Colors().chalchihuitl400} >
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
      <div className="column centro">
        <div className='card_analitics'>
            <SvgIcon
              component={DeliveryDining}
              className='icon_card_analitic'
              htmlColor={Colors().tizatl600}
            />
            <Typography variant="cardTitle">
                {`${metricaDatos.rutas} Ruta${metricaDatos.rutas > 1 ? `s` : ''}`}
            </Typography>
        </div>
        <div className='card_analitics'>
            <SvgIcon
              component={PersonPin}
              className='icon_card_analitic'
              htmlColor={Colors().tizatl600}
            />
            <Typography variant="cardTitle">
            {`${metricaDatos.repartidores} Conductor${metricaDatos.repartidores > 1 ? `es` : ''} `}
            </Typography>
        </div>
      </div>
      <div className="column izquierda">
        <div className="primer-elemento">
          <img src="src\utils\icons\pin-omaka.svg" className="pin-image" />
          <div className="titulo-nivel">Omaka {Nivel.toLocaleUpperCase()}</div>
        </div>
        <DescripcionPlan nivel={Nivel} />
        <div className="boton-contrata">
          <Buttons
            action={() => setOpenModal(true)}
            text="Contrata Premium"
            type="primary"
            color={Colors().chalchihuitl200}
            textColor={Colors().tizatl600}
          />
        </div>
      </div>

      <ModalContrata
        open={openModal}
        onClose={() => setOpenModal(false)}
        nivel={Nivel}
      />
    </div>
  );
};
