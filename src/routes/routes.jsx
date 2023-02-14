import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from '../screens/login/login';

import { PanelDeControl } from '../screens/panel-de-control/panel-de-control';


const PrivateWrapper = ({ children }) => {
  const auth = true;
  return auth? children : <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} children={[]} />
        <Route
          path="/panel"
          element={(
            <PrivateWrapper>
              <PanelDeControl/>
            </PrivateWrapper>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};



export default AppRouter;