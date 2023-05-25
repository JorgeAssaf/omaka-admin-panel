import { useState, useEffect } from "preact/hooks";
import { memo } from "preact/compat";
import { getLastUpdate } from "../../../utils/dateAndTime";
import Colors from "../../../utils/colors";
import { SvgIcon } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";
import './styles.css';
import { MarkerUserProps } from "../../../types/typeAtoms";

const DEFAULT_COLOR = Colors().texotli300;



const MarkerUser = ({ color = DEFAULT_COLOR, title, kmh, lastUpdate }: MarkerUserProps) => {
  const [formattedLastUpdate, setFormattedLastUpdate] = useState(
    getLastUpdate(lastUpdate)
  );

  useEffect(() => {
    setFormattedLastUpdate(getLastUpdate(lastUpdate));
  }, [lastUpdate]);
  return (
    <div className="deliveryMarker">
      <div style={{ backgroundColor: color }} className="kmh-indicator">
        {parseInt(kmh)} km/h <br /> hace {formattedLastUpdate}
      </div>
      <SvgIcon component={DirectionsCar} fontSize="small" htmlColor={color} />
      {title ? (
        <div
          className="title-deliveryMarker"
          style={{ backgroundColor: color }}
        >
          {title}
        </div>
      ) : null}
    </div>
  );
};

export default memo(MarkerUser);

