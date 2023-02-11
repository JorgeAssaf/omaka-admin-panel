import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PanelDeControl } from '../features/panel-de-control/panel-de-control';


export const AdminRoutes = () => (
  <div>
    <Routes>
      <Route path='/' element={<PanelDeControl/>} />
    </Routes>
  </div>
);

