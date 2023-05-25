import { useState, useEffect } from "preact/hooks";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Buttons } from "../../components/atoms/buttons";
import HeaderSection from "../../components/header/headerSection";
import { RootState } from "../../redux/reducers/mainReducer";
import { RepartidorTypeForm } from "../../types/typeRepartidor";
import Colors from "../../utils/colors";
import { DetallesRepartidor } from "../repartidores/detallesRepartidor";
import FormularioDatos from "./formulario-datos";
import './styles.css';
import { esMayorDeEdad } from "../../utils/dateAndTime";

type NuevoRepartidorProps = {
  handleSubmit: (repartidor: RepartidorTypeForm) => void;
  loading: boolean;
  setScreenShow: (screen: string) => void
};




const NuevoRepartidor = ({ handleSubmit, setScreenShow, loading, }: NuevoRepartidorProps) => {
  const [screenLocal, setScreenLocal] = useState("data");
  const [dataForm, setDataForm] = useState({} as RepartidorTypeForm);
  const { DatosPersonales } = useSelector((state: RootState) => state.user.userData as any);

  const callBackRepartidor = () => {
    if (dataForm.apellido &&
      dataForm.correo &&
      dataForm.fechaNacimiento &&
      dataForm.nombre &&
      dataForm.password &&
      dataForm.telefono) {
      if (esMayorDeEdad(dataForm.fechaNacimiento)) {
        dataForm.creador = {
          name: DatosPersonales.nombre,
          id: DatosPersonales?.idUsuario
        }
        handleSubmit(dataForm);
      } else {
        toast.warning('Necesita ser mayor de edad')
      }

    } else {
      toast.error('Llena todos los campos')
    }
  }


  const navigationBack = () => {
    switch (screenLocal) {
      case 'data':
        setScreenShow('list')
        break;
    }
  }

  const navigationNext = () => {
    switch (screenLocal) {
      case 'data':
        callBackRepartidor()
        break;
    }
  }

  return (
    <div className="nueva-ruta-container">
      <div className=" lista_container contracted">
        <HeaderSection
          title={"Nuevo repartidor"}
          actionBack={() => navigationBack()}
        />
        {screenLocal == "data" ? (
          <FormularioDatos
            setDataForm={setDataForm}
            dataForm={dataForm}
            loading={loading}
          />
        ) : <></>
        }
      </div>
      <div className="detalle-ruta-container">
        <DetallesRepartidor repartidor={dataForm} />
        <div className="btn_nueva_repartidor">
          <Buttons
            textColor={Colors().iztac}
            color={Colors().texotli300}
            text={'Crear Repartidor'}
            loading={loading}
            type="primary"
            action={() => navigationNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default NuevoRepartidor;
