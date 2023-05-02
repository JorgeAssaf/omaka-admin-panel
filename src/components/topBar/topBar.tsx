import React, { useEffect } from "react";
import { Buttons } from "../atoms/buttons";
import Colors from "../../utils/colors";
import Avatar from "../atoms/avatar/avatarUser";
import "./styles.css";
import { RootState } from "../../redux/reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const UserBar = () => {
  const { DatosPersonales, Nivel } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth);
    navigate('/');
    dispatch({ type: "setUserData", payload: {} });
  };
  useEffect(() => {
    if (!DatosPersonales) {
      signOut(auth);
      navigate('/');
    }
  }, []);

  return (
    <div className="topBarContainer">
      <div className="leftSide">
        <div className="avatar_topBar_container">
          {DatosPersonales? (
            <Avatar
              fullName={DatosPersonales.nombre}
              uuid={DatosPersonales.idUsuario}
              size="small"
              editable={true}
              onClick={() => navigate("/perfil")}
            />
          ) : null}
        </div>
        <Buttons
          action={() => navigate("/perfil")}
          text={DatosPersonales?.nombre}
          type="tertiary"
          textColor={Colors().akostik200}
        />
        <Buttons
          action={() => null}
          text={Nivel?.toUpperCase()}
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
