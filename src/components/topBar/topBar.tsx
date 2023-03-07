import { Button } from "@mui/material";
import React, { useState } from "react";
import { Buttons } from "../atoms/buttons";
import Colors from "../../utils/colors";
import Avatar from "../atoms/avatar/avatarUser";
import './styles.css';
import { RootState } from "../../redux/reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import { InformationChip } from "../atoms/information-chip";
import { getAuth, signOut } from "firebase/auth";

type UserBarInterface = {
  changeContent: any;
}

export const UserBar = ({changeContent}: UserBarInterface) => {
  const {DatosPersonales, Nivel} = useSelector((state: RootState) => state.user.userData as any);
  const auth = getAuth();
  const dispatch = useDispatch();
  const signOutUser = () => {
    signOut(auth);
    dispatch({ type: 'setUserData', payload: {} });
  }  
  return (
    <div className='topBarContainer'>
      <div className='leftSide'>
        <div className='avatarContainer'>
          <Avatar editable={true} onClick={() => changeContent('editarPerfil')}  />
        </div>
        <Buttons
          action={() => null}
          text={DatosPersonales?.nombre}
          type="tertiary"
          textColor={Colors().akostik200}
        />
        <Buttons
          action={() => null}
          text={Nivel.toUpperCase()}
          type="primary"
          color={Colors().akostik200}
          textColor={Colors().tizatl600}
        />
      </div>
     
      <Buttons
        action={() => signOutUser()}
        text="CERRAR SESION"
        type="tertiary"
        textColor={Colors().akostik200}
      />
    </div>
  );
};
