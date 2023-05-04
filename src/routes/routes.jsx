import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MainAuth from "../screens/login/mainAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebase";
import { getUser } from "../api/userQuerys";
import { useDispatch, useSelector } from "react-redux";
import { PanelRutas } from "../screens/rutas/panel-rutas";
import { PanelPedidos } from "../screens/pedidos/panel-pedidos";
import PanelFreeTrial from "../screens/freeTrial/freeTrial";
import { EditarPerfilUsuario } from "../screens/perfil-usuario/editar-perfil";
import { PanelRepartidores } from "../screens/repartidores/panel-repartidores";
import PanelReportes from "../screens/reportes/reportes";
import { PanelClientes } from "../screens/clientes/panel-cliente";
import { isFreePeriod } from "../utils/dateAndTime";
import Loading from "../components/atoms/loading";

const PrivateWrapper = ({ children, isAuthenticated, status,isOnFreePeriod }) => {
  if ((isAuthenticated && status === 1) || (isAuthenticated && status === 0 && isOnFreePeriod)) {
    return children;
  } else if (isAuthenticated && status == 0 && !isOnFreePeriod) {
    return <Navigate to="/freeTrial" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

const FreeWrapper = ({ children, isAuthenticated, status, isOnFreePeriod }) => {
  if ((isAuthenticated && status === 1) || (status === 0 && isOnFreePeriod)) {
    return <Navigate to="/panel/pedidos" replace />;
  } else if (isAuthenticated && status == 0 && !isOnFreePeriod) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

const PublicWrapper = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to="/panel/pedidos" replace />;
};

const AppRouter = () => {
  const { DatosPersonales } = useSelector((state) => state.user.userData)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusUser, setStatusUser] = useState(0);
  const [isOnFreePeriod, setIsOnFreePeriod] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalMobile, setShowModalMobile] = useState(false);
  const dispatch = useDispatch();
  const inicializeFirebase = app;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      getUserData(user?.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    getFreeTrialData(DatosPersonales);
    setStatusUser(DatosPersonales.status);
  },[DatosPersonales])

  const getUserData = async (uid) => {
    if (uid) {
      const userData = await getUser(uid);
      if (userData) {
        dispatch({ type: "setUserData", payload: userData });
        getFreeTrialData(userData.DatosPersonales);
        setStatusUser(userData.DatosPersonales.status);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const getFreeTrialData = (DatosPersonales) => {
    if(DatosPersonales){
      if (DatosPersonales.trialEndDate) {
        const isOnFree = isFreePeriod(
          DatosPersonales.fechaCreacion,
          DatosPersonales.trialEndDate
        );
        setIsOnFreePeriod(isOnFree);
      } else {
        setIsOnFreePeriod(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="full-container center absolute">
        <Loading />
      </div>
    );
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
          path="/freeTrial"
          element={
            <FreeWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelFreeTrial />
            </FreeWrapper>
          }
        />
        <Route
          path="/panel/pedidos"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelPedidos />
            </PrivateWrapper>
          }
        />
        <Route
          path="/panel/rutas"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelRutas />
            </PrivateWrapper>
          }
        />
        <Route
          path="/panel/repartidores"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelRepartidores />
            </PrivateWrapper>
          }
        />
          <Route
          path="/panel/clientes"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelClientes />
            </PrivateWrapper>
          }
        />
        
        <Route
          path="/panel/reportes"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <PanelReportes />
            </PrivateWrapper>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateWrapper
              isAuthenticated={isAuthenticated}
              status={statusUser}
              isOnFreePeriod={isOnFreePeriod}
            >
              <EditarPerfilUsuario />
            </PrivateWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
