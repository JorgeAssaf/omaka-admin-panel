import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MainAuth from "../screens/login/mainAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebase";
import { getUser } from "../api/userQuerys";
import { useDispatch } from "react-redux";
import { PanelRutas } from "../screens/rutas/panel-rutas";
import { PanelPedidos } from "../screens/pedidos/panel-pedidos";
import { EditarPerfilUsuario } from "../screens/perfil-usuario/editar-perfil";
import { PanelRepartidores } from "../screens/repartidores/panel-repartidores";
import PanelReportes from "../screens/reportes/reportes";

const PrivateWrapper = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};
const PublicWrapper = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to="/panel/pedidos" replace />;
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const inicializeFirebase = app;
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      getUserData(user?.uid);
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid) => {
    if (uid) {
      const userData = await getUser(uid);
      if (userData) {
        dispatch({ type: "setUserData", payload: userData });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicWrapper isAuthenticated={isAuthenticated}>
              <MainAuth />
            </PublicWrapper>
          }
        />
        <Route
          path="/panel/pedidos"
          element={
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <PanelPedidos />
            </PrivateWrapper>
          }
        />
        <Route
          path="/panel/rutas"
          element={
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <PanelRutas />
            </PrivateWrapper>
          }
        />
         <Route
          path="/panel/repartidores"
          element={
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <PanelRepartidores />
            </PrivateWrapper>
          }
        />
         <Route
          path="/panel/reportes"
          element={
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <PanelReportes />
            </PrivateWrapper>
          }
        />
         <Route
          path="/perfil"
          element={
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <EditarPerfilUsuario />
            </PrivateWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
