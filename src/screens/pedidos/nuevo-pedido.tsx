import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { Buttons } from "../../components/atoms/buttons";
import CheckBox from "../../components/atoms/checkBox/checkbox";
import { OrderTypeForm } from "../../types/typeOrders";
import Colors from "../../utils/colors";
import { usePlacesWidget } from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/mainReducer";
import Geocode from "react-geocode";

type NuevoPedidoProps = {
  handleSubmit: (pedido: OrderTypeForm) => void;
  loading: boolean;
};

const NuevoPedido = ({ handleSubmit, loading }: NuevoPedidoProps) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [direccionPedido, setDireccionPedido] = useState('');
  const [ubicacionPedido, setUbicacionPedido] = useState({
    lat: 20.661844,
    lng: -103.704351
  } as OrderTypeForm["ubicacionPedido"]);
  const [telefonoPedido, setTelefonoPedido] = useState('');
  const [notaDePedido, setNotaDePedido] = useState('');
  const [orderSaved,setOrderSaved] = useState(false);
  const newBound = useSelector((state: RootState) => state.pedidos.newBound as any);
  const dispatch = useDispatch();
  const [ban, setBan] = useState(true)

  useEffect(() => {
    if(ban){
      initialize();
    }
    
  }, [])
  
  useEffect(() => {
    if(ban){
      //initialize();
      setBan(false);
    }
    else{
      console.log(newBound);
      Geocode.fromLatLng(newBound.ubicacionPedido.lat, newBound.ubicacionPedido.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setDireccionPedido(address);
          setUbicacionPedido({lat:newBound.ubicacionPedido.lat,lng:newBound.ubicacionPedido.lng});

        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [newBound])

  const initialize =()=>{
    Geocode.setApiKey(import.meta.env.VITE_KEY_MAPS);
    Geocode.setLanguage("es");
    Geocode.setRegion("mx");
    }
  
  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_KEY_MAPS,
    onPlaceSelected: (place) => {
      let newPlace=[{ubicacionPedido:{lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}}];
      setUbicacionPedido({lat:place.geometry.location.lat(),lng:place.geometry.location.lng()});
      setDireccionPedido(place.formatted_address);
      dispatch({ type: 'setNewPedido', payload: newPlace });

    },
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "mx" },
    },
  });


  const callBackPedido = () => {    
    if(nombreCliente && direccionPedido && ubicacionPedido.lat && ubicacionPedido.lng && telefonoPedido && notaDePedido){
      handleSubmit({
        nombreCliente,
        direccionPedido,
        ubicacionPedido,
        telefonoPedido,
        notaDePedido,
      });
    }else{
    console.log("[as]444");
      toast.error('Llena todos los campos :D')
    }

  };

  return (
    <div className="nuevo-pedido-form">
       <div className="item-input">
        <label>Direccion:</label>
        <input
          type="text"
          value={direccionPedido}
          ref={ref}
          onChange={(event) =>
            setDireccionPedido((event.target as HTMLInputElement).value)
          }
          required
        />
      </div>
      <div className="item-input">
        <label>Nombre cliente:</label>
        <input
          type="text"
          value={nombreCliente}
          onChange={(event) =>
            setNombreCliente((event.target as HTMLInputElement).value)
          }
          required
        />
      </div>
      <div className="item-input">
        <label>Telefono:</label>

        <input
          type="text"
          value={telefonoPedido}
          onChange={(event) =>
            setTelefonoPedido((event.target as HTMLInputElement).value)
          }
          required
        />
      </div>
      <div className="item-input">
        <label>Notas:</label>
        <textarea
          type="text"
          value={notaDePedido}
          onChange={(event) =>
            setNotaDePedido((event.target as HTMLInputElement).value)
          }
          required
        />
      </div>
       <div className="item-check">
        <label>Guardar cliente?</label>
        <CheckBox isActive={orderSaved} setIsActive={setOrderSaved} size={30} />
      </div>

      <div className="btn-container">
        <Buttons
          textColor={Colors().iztac}
          color={Colors().texotli300}
          text="Crear Pedido"
          loading={loading}
          type="primary"
          action={() => callBackPedido()}
        />
      </div>
    </div>
  );
};

export default NuevoPedido;
