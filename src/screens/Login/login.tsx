import { useState } from "preact/hooks";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import './styles.css'
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import { obtenerMensajeErrorFirebaseAuth } from "../../utils/firebase";

type LoginProps = {
  setScreenShow: (screen: string) => void;
}

const Login = ({ setScreenShow }: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      setError("");
      setLoading(false);
    } catch (error: any) {
      toast.error(`${obtenerMensajeErrorFirebaseAuth(error.code)}`);
      setError("Usuario o contraseña incorrectos");
      setLoading(false);
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
        <div className='btns-container'>
          <Buttons text='Iniciar sesión' action={handleSubmit} loading={loading} type='primary' color={Colors().akostik200} />
        </div>

        <div onClick={() => setScreenShow('register')} className='registerText' >Registrarme</div>
      </form>
    </div>
  );
};

export default Login;
