import React from 'react';
import {PanelDeControl} from '../features/panel-de-control/panel-de-control';
import { Route, Routes, Navigate } from 'react-router-dom';


export const AdminRoutes = () => (
  <div>
    <Routes>

      <Route path={'/panel-de-control'} element={<PanelDeControl />} />
     </Routes>
  </div>
);

