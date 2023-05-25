import { Email, Phone } from "@mui/icons-material";
import Avatar from "../atoms/avatar/avatarUser";
import { IconText } from "../atoms/iconText";
import Typography from "../atoms/typography";
import { UserType } from "../../types/typeUser";
import { getDateAndHour, isFreePeriod } from "../../utils/dateAndTime";
import { DescripcionPlan } from "../../screens/perfil-usuario/descripcion-plan";
import { Buttons } from "../atoms/buttons";
import Colors from "../../utils/colors";

interface datosCardProps {
  dataProfile: UserType["DatosPersonales"];
  Nivel: string;
  onCallback: () => void;
}

const SuscriptionCard = ({ dataProfile, Nivel, onCallback }: datosCardProps) =>
  dataProfile ? (
    <div className="paper suscription">
      <div className="paper-header">
        <img src="src/assets/omakaNegocios.avif" className="pin-image" alt='omakaNegocios' />
        <Typography variant="cardTitle">{`Omaka ${Nivel.toLocaleUpperCase()}`}</Typography>
      </div>
      {isFreePeriod(dataProfile.fechaCreacion, dataProfile.trialEndDate) ? (
        <div className="item-datos">
          <Typography variant="label">{`Disfruta gratis hasta :`}</Typography>
          <Typography variant="cardInfo">
            {getDateAndHour(dataProfile.trialEndDate)}
          </Typography>
        </div>
      ) : null}
      <div className="item-datos">
        <Buttons
          action={() => onCallback()}
          text="Ver planes"
          type="primary"
          color={Colors().chalchihuitl200}
          textColor={Colors().tizatl600}
        />
      </div>
    </div>
  ) : null;

export default SuscriptionCard;
