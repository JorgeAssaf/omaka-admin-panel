import { useState } from "preact/compat";
import { InformationChip } from "../../components/atoms/information-chip";
import LabelInput from "../../components/atoms/label-input";
import "./styles.css";
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import MapView from "../../components/map/MapView";
import { PointType } from "../../types/typesMap";
import { editOrder, deleteOrder } from "../../api/ordersQuerys";
import { toast } from "react-toastify";
import Typography from "../../components/atoms/typography";
import DetallesPedidoCard from "../../components/cardDetallesPedido/detalles-pedido-card";
import { OrderType } from "../../types/typeOrders";
import { Close } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

type DetallesPedidosInterface = {
  datosPedido: OrderType;
  onClose: () => void;
  eliminateAction: () => void;
  editarAction: () => void;
};

export const DetallesPedidos = ({
  datosPedido,
  onClose,
  eliminateAction,
  editarAction
}: DetallesPedidosInterface) => {
  return (
    <div className="relative">
      <div onClick={() => onClose()} className="closeBtn float circle">
        <SvgIcon component={Close} fontSize="small" />
      </div>
      <div className="order-detalles-reporte">
        <DetallesPedidoCard {...datosPedido} />
      </div>
      {datosPedido.status === "pending" ? (
        <div className="optios_detalles_pedido">
          <Buttons
            textColor={Colors().iztac}
            color={Colors().zacatazcalli300}
            text="Editar"
            type="primary"
            action={editarAction}
            width="95%"
          />
          <Buttons
            textColor={Colors().iztac}
            color={Colors().xochipaltic400}
            text="Eliminar"
            type="primary"
            action={eliminateAction}
            width="95%"
          />
        </div>
      ) : null}
    </div>
  );
};
