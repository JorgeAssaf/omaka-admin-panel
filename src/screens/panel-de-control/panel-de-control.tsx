import React, { useState, useEffect } from "react";
import SlideBar from "../../components/slide-bar/slide-bar";
import { UserBar } from "../../components/topBar/topBar";

import "./styles.css";

export const PanelDeControl = ({ children, currentSection }) => {
 
  return (
    <div className="panel-container">
     
      <UserBar />
      <div className="panelControlContainer">
        <SlideBar currentSection={currentSection} />
        <div className="leftPanelContainer">{children}</div>
      </div>
    </div>
  );
};
