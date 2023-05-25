import { useState, useEffect } from "preact/hooks";
import './slie-bar.css';
import {
  TextSnippet,
  FmdGood,
  Person,
  Settings,
  Inventory2,
  PersonPin,
  ChevronRight,
  ChevronLeft
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Colors from "../../utils/colors";
import { SvgIcon } from "@mui/material";

const PEDIDOS = "/panel/pedidos";
const CONFIGURACION = "/perfil";
const RUTAS = "/panel/rutas";
const CONDUCTORES = "/panel/repartidores";
const REPORTES = "/panel/reportes";
const CLIENTES = "/panel/clientes";

export const SlideBar = ({ currentSection }: { currentSection: string }) => {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const onClickItem = (e) => {
    navigate(e);
  };

  const sections = [
    { name: "Pedidos", iconSrc: TextSnippet, path: PEDIDOS },
    { name: "Rutas", iconSrc: FmdGood, path: RUTAS },
    { name: "Conductores", iconSrc: Person, path: CONDUCTORES },
    { name: "Clientes", iconSrc: PersonPin, path: CLIENTES },
    { name: "Reportes", iconSrc: Inventory2, path: REPORTES },
  ];


  return (
    <div
      className={!hovered ? "slide-bar slide-bar-onboarding" : "slide-bar slide-bar-hovered slide-bar-onboarding"}
    >
      <div className='iconSlide' onClick={() => setHovered(!hovered)} >
        <SvgIcon
          component={hovered ? ChevronLeft : ChevronRight}
          fontSize="large"
          htmlColor={Colors().tizatl600}
        />
      </div>
      <div className="icons">
        {sections.map((section) => (
          <div onClick={() => onClickItem(section.path)} key={section.name} className={section.path === currentSection ? "icon-container active" : "icon-container"}>
            <SvgIcon
              component={section.iconSrc}
              fontSize="large"
              htmlColor={Colors().tizatl600}
            />
            <p className={!hovered ? "icon-text" : "icon-text show"}>{section.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideBar;
