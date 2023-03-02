import { SvgIcon } from "@mui/material";
import { useState } from "react";
import {
  KeyboardArrowLeftRounded,
  Email,
  Phone,
  CalendarMonth
} from "@mui/icons-material";
import { IconText } from "../atoms/iconText";
import "./styles.css";
import { RepartidorType } from "../../types/typeRepartidor";
import Avatar from "../atoms/avatar/avatarUser";
import Typography from "../atoms/typography";
import { InformationChip } from "../atoms/information-chip";
import Colors, { repartidorColor } from "../../utils/colors";
import { Buttons } from "../atoms/buttons";

type DetallesRepartidorCard = {
  dataRepartidor: RepartidorType;
  goBack: () => void;
  editProfileAction: () => void;
};

export const DetallesRepartidorCard = ({
  dataRepartidor,
  goBack,
  editProfileAction
}: DetallesRepartidorCard) => {
  const { DatosPersonales, Ubicacion } = dataRepartidor;

  const [isSelect, setIsSelect] = useState(true);
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };

  const getColorStatus = () => {
    if (Ubicacion?.status) {
      return repartidorColor[Ubicacion.status];
    } else {
      return undefined;
    }
  };

  return DatosPersonales.nombre ? (
    <div className="header_detalles_container">
      <div className="header_container">
        <div className="header_left">
          <div onClick={() => goBack()} className="back_button">
            <SvgIcon
              component={KeyboardArrowLeftRounded}
              fontSize="large"
              htmlColor={Colors().iztac}
            />
          </div>
          <div className="data_container">
            <div className="title_container">
              <div className="avatar_container">
                <Avatar
                  src={DatosPersonales.foto ? DatosPersonales.foto : ""}
                />
              </div>
              <Typography
                color={Colors().akostik200}
                variant="cardTitle"
              >{`${DatosPersonales.nombre} ${DatosPersonales.apellido?DatosPersonales.apellido:''}`}</Typography>
              <InformationChip
                text={Ubicacion?.status}
                color={getColorStatus()}
              />
            </div>
            <div className="extra_data_container">
              {DatosPersonales.fechaNacimiento && (
                <div className="data_item">
                  <IconText
                    icon={CalendarMonth}
                    iconSize="small"
                    text={DatosPersonales.fechaNacimiento}
                    textColor={Colors().akostik200}
                  />
                </div>
              )}
              {DatosPersonales.correo && (
                <div className="data_item">
                  <IconText
                    icon={Email}
                    iconSize="small"
                    text={DatosPersonales.correo}
                    textColor={Colors().akostik200}

                  />
                </div>
              )}

              {DatosPersonales.telefono && (
                <div className="data_item">
                  <IconText
                    icon={Phone}
                    iconSize="small"
                    text={DatosPersonales.telefono}
                    textColor={Colors().akostik200}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {editProfileAction && (
          <div className="header_right">
            <Buttons
              text="Editar"
              color={Colors().zacatazcalli300}
              textColor={Colors().iztac}
              type="primary"
              action={() => editProfileAction()}
            />
          </div>
        )}
      </div>
    </div>
  ):(<></>);
};
