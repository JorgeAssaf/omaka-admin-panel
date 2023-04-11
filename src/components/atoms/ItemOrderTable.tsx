import { MoreVertRounded } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { ItemOrderTableProps } from "../../types/typeAtoms";
import { RateType } from "../../types/typeRate";
import Colors from "../../utils/colors";
import { getDateAndHour, getTimeDifference } from "../../utils/dateAndTime";
import { statusRuta } from "../../utils/statusTraslate";
import { stringCutting } from "../../utils/stringModifier";
import Avatar from "./avatar/avatarUser";
import { InformationChip } from "./information-chip";
import "./styles.css";
import Typography from "./typography";

export default function ItemOrderTable({
  datosRow,
  fechaInicio,
  setOrderDetails
}: ItemOrderTableProps) {
  const statusLabel = statusRuta(datosRow.status);
  const statusColor =
    datosRow.status == "pending"
      ? Colors().tizatl600
      : datosRow.status == "finish"
      ? Colors().chalchihuitl400
      : Colors().xochipaltic400;
  const tiempoEnPedido = getTimeDifference(fechaInicio,datosRow.fechaEntrega);

  return (
    <div
      onClick={() => setOrderDetails(datosRow)}
      className="item-reporte-container"
      style={{ backgroundColor: Colors().akostik050 }}
    >
      <div className="item-table-title small table-child left">
        <Typography variant="cardTitle">
         {`...${datosRow.idPedido.slice(-3)}`}
        </Typography>
      </div>
      <div className="item-reporte-table-repa table-child left">
        <Typography variant="cardInfo">{datosRow.nombreCliente}</Typography>
      </div>
      <div className="item-table-subtitle table-child left">
        <Typography variant="cardInfo">{stringCutting(datosRow.direccionPedido,15)}</Typography>
      </div>
      <div className="item-table-subtitle small table-child left">
        <Typography variant="cardInfo">
          {tiempoEnPedido}
        </Typography>
      </div>
      <div className="table-child small  chipContainer">
        <InformationChip
          text={'o'}
          color={statusColor}
          textColor={Colors().iztac}
        />
      </div>
      <div className="table-child small chipContainer right">
        <div className='more-options-icon'>
            <SvgIcon
              component={MoreVertRounded}
              fontSize="small"
              htmlColor={Colors().tizatl600}
            />
        </div>
      </div>
    </div>
  );
}
