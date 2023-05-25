import { useState } from "preact/hooks";
import {
  Email,
  Phone,
  CalendarMonth,
  Warning,
  CalendarToday
} from "@mui/icons-material";
import { IconText } from "../atoms/iconText";
import "./styles.css";
import Avatar from "../atoms/avatar/avatarUser";
import Typography from "../atoms/typography";
import Colors from "../../utils/colors";
import { ClientType } from "../../types/typeOrders";
import { getDateAndHour } from "../../utils/dateAndTime";

type DetallesRepartidorCard = {
  cliente: ClientType;
  editProfileAction: () => void;
};

export const DetallesClienteCard = ({
  cliente,
  editProfileAction
}: DetallesRepartidorCard) => {
  const [isSelect, setIsSelect] = useState(true);

  return cliente?.nombreCliente ? (
    <div className="header_detalles_container">
      <div className="header_container">
        <div className="header_left">
          <div className="data_container">
            <div className="title_container">
              <div className="avatar_container">
                <Avatar
                  uuid={cliente.idCliente}
                  fullName={cliente.nombreCliente}
                  src={""}
                />
              </div>
              <Typography
                color={Colors().akostik200}
                variant="cardTitle"
              >{`${cliente.nombreCliente}`}</Typography>
            </div>
            <div className="extra_data_container">
              <div className="data_item">
                <IconText
                  icon={CalendarMonth}
                  iconSize="small"
                  text={getDateAndHour(cliente.fechaCreacion)}
                  textColor={Colors().akostik200}
                />
              </div>
              {cliente.direccionPedido && (
                <div className="data_item">
                  <IconText
                    icon={Email}
                    iconSize="small"
                    text={cliente.direccionPedido}
                    textColor={Colors().akostik200}
                  />
                </div>
              )}
              {cliente.telefonoPedido && (
                <div className="data_item">
                  <IconText
                    icon={Phone}
                    iconSize="small"
                    text={cliente.telefonoPedido}
                    textColor={Colors().akostik200}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {editProfileAction && (
          <div className="header_right">
            <Buttons
              text="Editar"
              color={Colors().zacatazcalli300}
              textColor={Colors().iztac}
              type="primary"
              action={() => editProfileAction()}
            />
          </div>
        )} */}
      </div>
      {cliente.Reports?.length ? (
        <div className="report-detalles-card">
          <Typography variant="cardInfo" color={Colors().iztac}>
            Reporte
          </Typography>
          {cliente.Reports.map(({ report }) => {
            <>
              <div className="item_detalles_pedidos">
                <IconText
                  textColor={Colors().akostik200}
                  icon={Warning}
                  iconSize="small"
                  text={report?.messageReport || ""}
                />
                <IconText
                  textColor={Colors().akostik200}
                  icon={CalendarToday}
                  iconSize="small"
                  text={getDateAndHour(report?.dateReport)}
                />
              </div>
            </>;
          })}
        </div>
      ) : null}
    </div>
  ) : (
    <></>
  );
};
