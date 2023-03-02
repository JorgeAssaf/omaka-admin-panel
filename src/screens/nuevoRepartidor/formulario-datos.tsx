import { RepartidorTypeForm } from "../../types/typeRepartidor";

type FormularioDatosProps = {
    setDataForm : (value: RepartidorTypeForm) => void;
    dataForm: RepartidorTypeForm;
    loading: boolean;
  };

  
const FormularioDatos = ({
  dataForm,
  setDataForm,
  loading
  }: FormularioDatosProps) => {
    return (
      <div className="nuevo-pedido-form">
        <div className="item-input">
          <label>Nombre</label>
          <input
            type="text"
            value={dataForm.nombre}
            onChange={(event) =>
              setDataForm({...dataForm,nombre:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
        <div className="item-input">
          <label>Apellidos</label>
          <input
            type="text"
            value={dataForm.apellido}
            onChange={(event) =>
              setDataForm({...dataForm,apellido:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
        <div className="item-input">
          <label>Fecha nacimiento</label>
          <input
            type="date"
            value={dataForm.fechaNacimiento}
            onChange={(event) =>
              setDataForm({...dataForm,fechaNacimiento:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
        <div className="item-input">
          <label>Telefono</label>
          <input
            type="phone"
            value={dataForm.telefono}
            onChange={(event) =>
              setDataForm({...dataForm,telefono:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
        <div className="item-input">
          <label>Correo</label>
          <input
            type="phone"
            value={dataForm.correo}
            onChange={(event) =>
              setDataForm({...dataForm,correo:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
        <div className="item-input">
          <label>Password</label>
          <input
            type="phone"
            value={dataForm.password}
            onChange={(event) =>
              setDataForm({...dataForm,password:(event.target as HTMLInputElement).value})
            }
            required
          />
        </div>
      </div>
    );
  };

  export default FormularioDatos