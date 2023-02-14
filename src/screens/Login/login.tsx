import React, { useState } from "react";
import './styles.css'

const Login = ()  => {
    const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      setError("");
      alert("Login exitoso!");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default Login;
