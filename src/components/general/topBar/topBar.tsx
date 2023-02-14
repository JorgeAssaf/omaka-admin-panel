import { Button } from "@mui/material";
import React, { useState } from "react";
import { Buttons } from "../buttons";
import Colors from "../../../utils/colors";
import Avatar from "../avatar/avatarUser";
import './styles.css';

export const UserBar = () => {
  const [userData, setUserData] = useState({ username: "Indiana Jones" });

  return (
    <div className='topBarContainer'>
      <div className='leftSide'>
        <div className='avatarContainer'>
          <Avatar src="https://thumbs.dreamstime.com/b/selfie-man-blogger-talks-subscribers-sea-beach-waves-hand-smiles-video-young-tourist-background-greets-portrait-159428734.jpg" />
        </div>
        <Buttons
          action={() => null}
          text={userData.username}
          type="tertiary"
          textColor={Colors().akostik200}
        />
            
        <Buttons
          action={() => null}
          text="PREMIUM"
          type="primary"
          color={Colors().akostik200}
          textColor={Colors().tizatl600}
        />
      </div>
     
      <Buttons
        action={() => null}
        text="CERRAR SESION"
        type="tertiary"
        textColor={Colors().akostik200}
      />
    </div>
  );
};
