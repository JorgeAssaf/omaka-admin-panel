import { ItemReportTableProps } from "../../types/typeAtoms";
import { RateType } from "../../types/typeRate";
import Colors from "../../utils/colors";
import { getDateAndHour } from "../../utils/dateAndTime";
import { statusRuta } from "../../utils/statusTraslate";
import { stringCutting } from "../../utils/stringModifier";
import Avatar from "./avatar/avatarUser";
import { InformationChip } from "./information-chip";
import "./styles.css";
import Typography from "./typography";

export default function ItemReportTable({
  datosRow,
  setRateDetails
}: ItemReportTableProps) {
  const repartidor = datosRow.repartidor;
  const statusLabel = statusRuta(datosRow.status);
  const statusColor =
    datosRow.status == "pending"
      ? Colors().tizatl600
      : datosRow.status == "finish"
      ? Colors().chalchihuitl400
      : Colors().xochipaltic400;

  return (
    <div
      onClick={() => setRateDetails(datosRow)}
      className="item-reporte-container"
      style={{ backgroundColor: Colors().akostik050 }}
    >
      <div className="item-table-title table-child">
        <Typography variant="cardTitle">
          {stringCutting(datosRow.nombreRuta, 20)}
        </Typography>
      </div>
      <div className="item-reporte-table-repa table-child">
        <Avatar
          size="small"
          src={repartidor.foto}
          fullName={repartidor.name}
          uuid={repartidor.id}
        />
        <Typography variant="cardInfo">{repartidor.name}</Typography>
      </div>
      <div className="item-table-subtitle table-child">
        <Typography variant="cardInfo">
          {getDateAndHour(datosRow.fechaCreacion)}
        </Typography>
      </div>
      <div className="item-table-subtitle table-child">
        <Typography variant="cardInfo">{datosRow.fechaEntrega}</Typography>
      </div>
      <div className="table-child small chipContainer">
        <InformationChip
          text={datosRow.pedidosEntregados.toString()}
          color={Colors().chalchihuitl400}
          textColor={Colors().iztac}
        />
      </div>
      <div className="table-child small chipContainer">
        <InformationChip
          text={datosRow.pedidosDetenidos.toString()}
          color={Colors().xochipaltic400}
          textColor={Colors().iztac}
        />
      </div>
      <div className="table-child small chipContainer">
        <InformationChip
          text={statusLabel}
          color={statusColor}
          textColor={Colors().iztac}
        />
      </div>
    </div>
  );
}
