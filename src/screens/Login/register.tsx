import React, { useState } from "react";
import { toast } from "react-toastify";
import { registrarUsuario } from "../../api/userQuerys";
import SelectInput from "../../components/atoms/select-input";
import IndustriasJson from '../../utils/industrias.json'
import "./styles.css";
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";

type LoginProps = {
  setScreenShow: (screen: string) => void;
};

function RegistrationForm({ setScreenShow }: LoginProps) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [industriaEmpresa,setIndustriaEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    const resApi = await registrarUsuario({
      correo,
      password,
      nombre,
      apellido,
      telefono,
      nombreEmpresa,
      industriaEmpresa
    });
    setLoading(false);
    
    if(resApi.status == 'OK'){
        setScreenShow("login");
        toast.success('Registro exitoso');
    }else{
        toast.error('Error al registrar, intente de nuevo!');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Registro</h2>
        <div className="item-row-register">
        <label>
          Correo electrónico:
          <input
            type="email"
            value={correo}
            onChange={(event) =>
              setCorreo((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(event) =>
              setNombre((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>
        <label>
          Apellidos:
          <input
            type="text"
            value={apellido}
            onChange={(event) =>
              setApellido((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            value={telefono}
            onChange={(event) =>
              setTelefono((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>
        <label>
          Nombre de empresa
          <input
            type="text"
            value={nombreEmpresa}
            onChange={(event) =>
              setNombreEmpresa((event.target as HTMLInputElement).value)
            }
            required
          />
        </label>

        <label>
            Industria de la empresa
         <div>
          <SelectInput options={IndustriasJson.industrias} onSelect={(value) => setIndustriaEmpresa(IndustriasJson.industrias[value-1]?.name)} textPlaceholder="Selecciona una industria"/>
         </div>
        </label>
        </div>

        <div className='btns-container'>
          <Buttons text='Registrarse' action={handleSubmit}  loading={loading} type='primary' color={Colors().akostik200} />
        </div>
        <p>
          ¿Ya tienes cuenta?{" "}
          <div onClick={() => setScreenShow("login")} type="button">
            Iniciar sesión
          </div>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
