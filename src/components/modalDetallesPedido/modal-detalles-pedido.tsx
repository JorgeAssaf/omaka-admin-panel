import { useState, useRef } from "react";
import {
  Person,
  Receipt,
  CalendarToday,
  Place,
  Phone,
  Note,
  Warning,
  Close
} from "@mui/icons-material";
import { IconText } from "../atoms/iconText";
import "./styles.css";
import Colors from "../../utils/colors";
import Typography from "../atoms/typography";
import { OrderType } from "../../types/typeOrders";
import { InformationChip } from "../atoms/information-chip";
import { getDateAndHour } from "../../utils/dateAndTime";
import { ModalDetallesPedidoProps } from "../../types/typeAtoms";
import { SvgIcon } from "@mui/material";

const ModalDetallesPedido = (props: ModalDetallesPedidoProps) => {
  const {
    direccionPedido,
    fechaCreacion,
    nombreCliente,
    notaDePedido,
    status,
    telefonoPedido,
    idPedido,
    report
  } = props.order;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      props.onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <div className="modal-wrapper" ref={modalRef}>
        <button className="modal-close-button" onClick={() => props.onClose()}>
          <SvgIcon
            component={Close}
            fontSize="small"
            htmlColor={Colors().tizatl600}
          />
        </button>
        <div className="modal-content">
          <div className="card-detalle-pedido-header">
            <Typography variant="cardTitle">
              {`Pedido: ${idPedido.slice(-8)}`}
            </Typography>
            <div className="card_chip_container">
              <InformationChip text={status} />
            </div>
          </div>
          <div>
            <div className="item_detalles_pedidos full modal">
              <IconText
                icon={Place}
                iconSize="small"
                text={direccionPedido}
                maxCharacters={100}
              />
            </div>
            <div className="item_detalles_pedidos modal">
              <IconText icon={Person} iconSize="small" text={nombreCliente} />
              <IconText
                icon={CalendarToday}
                iconSize="small"
                text={`Creado el: ${getDateAndHour(fechaCreacion)}`}
              />
            </div>
            <div className="item_detalles_pedidos modal">
              <IconText icon={Phone} iconSize="small" text={telefonoPedido} />
              <IconText icon={Receipt} iconSize="small" text={notaDePedido} />
            </div>
            {report ? (
              <div className="report-detalles-card">
                <Typography variant="cardInfo" color={Colors().iztac}>
                  Reporte
                </Typography>
                <div className="item_detalles_pedidos modal">
                  <IconText
                    icon={Warning}
                    iconSize="small"
                    text={report?.messageReport}
                  />
                  <IconText
                    icon={CalendarToday}
                    iconSize="small"
                    text={getDateAndHour(report?.dateReport)}
                  />
                </div>
              </div>
            ) : null}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesPedido;
