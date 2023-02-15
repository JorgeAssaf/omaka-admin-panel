import React, { useState } from "react";
import styled from "styled-components";
import SlideBar from "../../components/slide-bar/slide-bar";
import { UserBar } from "../../components/general/topBar/topBar";
import { PanelRutas } from "../rutas/panel-rutas";
import { PanelPedidos } from "../pedidos/panel-pedidos";
import './styles.css'
export const PanelDeControl = () => {
  const Seccion = {
    rutas: <PanelRutas />,
    pedidos: <PanelPedidos />
  };

  const [seccionActiva, setSeccionActiva] = useState("pedidos");

  const CambiarSeccion = (seccionSeleccionada) => {
    console.log(seccionSeleccionada);
    setSeccionActiva(seccionSeleccionada);
  };

  return (
    <div>
      <UserBar />
      <div className='panelControlContainer'>
        <SlideBar changeContent={CambiarSeccion} />
        <div className="leftPanelContainer">{Seccion[seccionActiva]}</div>
      </div>
    </div>
  );
};
