import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import './styles.css'

type LoginProps = {
  setScreenShow: (screen: string) => void;
}

const Login = ({setScreenShow}:LoginProps)  => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();   

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log(username);
      
      setError("");
      toast.success('Bienvenido!!');
    } catch (error) {
      console.log(error);
      
      toast.error(`Algo paso mal!:  ${error}`);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar sesión</h1>
        <div className="form-control">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <div onClick={()=>setScreenShow('register')} className='registerText' >Registrarme</div>
      </form>
    </div>
  );
};

export default Login;
