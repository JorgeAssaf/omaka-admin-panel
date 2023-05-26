import { Email, Phone } from "@mui/icons-material";
import Avatar from "../atoms/avatar/avatarUser";
import { IconText } from "../atoms/iconText";
import Typography from "../atoms/typography";
import { UserType } from "../../types/typeUser";
import { Buttons } from "../atoms/buttons";
import Colors from "../../utils/colors";

interface datosCardProps {
  dataProfile: UserType["DatosPersonales"],
  onClick: () => void;
}

const DatosCard = ({ dataProfile, onClick }: datosCardProps) => dataProfile ? (
  <div onClick={() => onClick()} className="paper datos">
    <div className="papaer-header">
      <Avatar
        fullName={dataProfile.nombre}
        src={dataProfile.foto}
        uuid={dataProfile.idUsuario}
        size="middle"
      />
    </div>
    <Typography variant="title" color="#ffffff">
      {`${dataProfile.nombre}  ${dataProfile.apellido}`}
    </Typography>
    <div className="item-datos">
      <IconText
        text={dataProfile.correo}
        icon={Email}
        iconSize="small"
        textColor="#ffffff"
      />
    </div>
    <div className="item-datos">
      <IconText
        text={dataProfile.telefono}
        icon={Phone}
        iconSize="small"
        textColor="#ffffff"
      />
    </div>
    <div className="item-datos">
      <Buttons
        action={() => onClick()}
        text="Ver detalles"
        type="primary"
        color={Colors().chalchihuitl200}
        textColor={Colors().tizatl600}
      />
    </div>
  </div>
) : null;

export default DatosCard;