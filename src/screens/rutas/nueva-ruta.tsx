import React, { useState } from "react";
import { toast } from "react-toastify";
import { Buttons } from "../../components/atoms/buttons";
import CheckBox from "../../components/atoms/checkBox/checkbox";
import { OrderTypeForm } from "../../types/typeOrders";
import { RateTypeForm, RateTypeFormSimple } from "../../types/typeRate";
import Colors from "../../utils/colors";
import { DetallesRuta } from "./detalles-ruta";

type NuevaRutaProps = {
  handleSubmit: (ruta: RateTypeFormSimple) => void;
  loading: boolean;
};

type FormularioDatosProps = {
  setFechaEntrega: (value: string) => void;
  setNombreRuta: (vlaue: string) => void;
  nombreRuta: string;
  fechaEntrega: string;
  loading: boolean;
};

const FormularioDatos = ({
  nombreRuta,
  fechaEntrega,
  setFechaEntrega,
  setNombreRuta,
  loading
}: FormularioDatosProps) => {
  return (
    <div className="nuevo-pedido-form">
      <div className="item-input">
        <label>Nombre de Ruta:</label>
        <input
          type="text"
          value={nombreRuta}
          onChange={(event) =>
            setNombreRuta((event.target as HTMLInputElement).value)
          }
          required
        />
      </div>
      <div className="item-input">
        <label>Fecha de entrega:</label>
        <input
          value={fechaEntrega}
          onChange={(event) =>
            setFechaEntrega((event.target as HTMLInputElement).value)
          }
          type="date"
          id="start"
          name="trip-start"
        />
      </div>
    </div>
  );
};

const NuevoRuta = ({ handleSubmit, loading }: NuevaRutaProps) => {
  const [screen, setScreen] = useState("data");
  const [dataForm, setDataForm] = useState({} as RateTypeFormSimple);

  const callBackRate = () => {
    if(dataForm.nombreRuta && dataForm.fechaEntrega){
      console.log('crear ruta');
      
    }else{
      toast.error('Llena todos los campos')
    }
  }

  return (
    <div className="nueva-ruta-container">
      <div className=" lista_container contracted">
        {screen == "data" ? (
          <FormularioDatos
            setFechaEntrega={(value) =>
              setDataForm({ ...dataForm, fechaEntrega: value })
            }
            setNombreRuta={(value) =>
              setDataForm({ ...dataForm, nombreRuta: value })
            }
            nombreRuta={dataForm.nombreRuta}
            fechaEntrega={dataForm.fechaEntrega}
            loading={loading}
          />
        ) : (
          <>
            
          </>
        )}
      </div>
      <div className="detalle-ruta-container">
        <DetallesRuta rateData={dataForm} />
        <div className="btn-nueva-ruta-container">
          <Buttons
            textColor={Colors().iztac}
            color={Colors().texotli300}
            text={screen === 'data'?'Siguiente':'Crear Ruta'}
            loading={loading}
            type="primary"
            action={() =>screen === 'data'?callBackRate():setScreen('pedidos')}
          />
        </div>
      </div>
    </div>
  );
};

export default NuevoRuta;
