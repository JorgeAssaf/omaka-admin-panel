import { useState, useRef } from "preact/hooks";
import {
  Close
} from "@mui/icons-material";
import "./styles.css";
import Colors from "../../utils/colors";
import Typography from "../atoms/typography";
import { ModalTypes } from "../../types/typeAtoms";
import { SvgIcon } from "@mui/material";

const ModalSimple = (props: ModalTypes) => {
  const {
    title,
    subtitle,
    onClose
  } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <div className="modal-wrapper" ref={modalRef}>
        <button className="modal-close-button" onClick={() => onClose()}>
          <SvgIcon
            component={Close}
            fontSize="small"
            htmlColor={Colors().tizatl600}
          />
        </button>
        <div className="modal-content">
          <div className="card-detalle-pedido-header">
            <Typography variant="cardTitle">
              {title}
            </Typography>
          </div>
          <div>
            <div className="item_detalles_pedidos full modal">
              <Typography variant="cardInfo">
                {subtitle}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSimple;
