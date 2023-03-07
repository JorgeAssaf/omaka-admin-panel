import React, { useState } from "react";
import styled from "styled-components";
import SlideBar from "../../components/slide-bar/slide-bar";
import { UserBar } from "../../components/topBar/topBar";
import { PanelRutas } from "../rutas/panel-rutas";
import { PanelPedidos } from "../pedidos/panel-pedidos";
import { EditarPerfilUsuario } from "../perfil-usuario/editar-perfil";
import './styles.css'
import { PanelRepartidores } from "../repartidores/panel-repartidores";
export const PanelDeControl = () => {
  const Seccion = {
    rutas: <PanelRutas />,
    pedidos: <PanelPedidos />,
    repartidores: <PanelRepartidores/>,
    editarPerfil: <EditarPerfilUsuario />
  };

  const [seccionActiva, setSeccionActiva] = useState("pedidos");

  const CambiarSeccion = (seccionSeleccionada) => {
    setSeccionActiva(seccionSeleccionada);
  };

  return (
    <div className='panel-container'>
      <UserBar changeContent={CambiarSeccion} />
      <div className='panelControlContainer'>
        <SlideBar changeContent={CambiarSeccion} />
        <div className="leftPanelContainer">{Seccion[seccionActiva]}</div>
      </div>
    </div>
  );
};
