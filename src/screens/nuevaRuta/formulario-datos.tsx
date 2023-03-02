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

  export default FormularioDatos