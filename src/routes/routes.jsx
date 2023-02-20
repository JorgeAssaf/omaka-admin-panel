import React, {useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import MainAuth from '../screens/login/mainAuth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {app} from '../utils/firebase'
import { PanelDeControl } from '../screens/panel-de-control/panel-de-control';
import { getUser } from '../api/userQuerys';
import { useDispatch } from 'react-redux';


const PrivateWrapper = ({ children, isAuthenticated }) => {
  return isAuthenticated? children : <Navigate to="/" replace />;
};
const PublicWrapper = ({ children, isAuthenticated }) => {
  return !isAuthenticated? children : <Navigate to="/panel" replace />;
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
      getUserData(user?.uid)
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid) => {
    if(uid){
      const userData = await getUser(uid);
      if(userData){
        dispatch({ type: 'setUserData', payload: userData });
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
    }else{
      setIsAuthenticated(false);
    }
  }
      
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PublicWrapper isAuthenticated={isAuthenticated}>
              <MainAuth/>
            </PublicWrapper>
          )}
        />
        <Route
          path="/panel"
          element={(
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <PanelDeControl/>
            </PrivateWrapper>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};



export default AppRouter;