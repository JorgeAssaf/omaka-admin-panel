import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import "./styles.css";
import Typography from "../../components/atoms/typography";
import { getUser, setFreeTrial } from "../../api/userQuerys";
import { UserType } from "../../types/typeUser";
import { isFreePeriod } from "../../utils/dateAndTime";
import logoImg from "../../assets/fullLogo.png";
import Colors from "../../utils/colors";
import { Buttons } from "../../components/atoms/buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loading from "../../components/atoms/loading";

const PanelFreeTrial = () => {
  const [loading, setLoading] = useState(true);
  const [isAvaibleFreePeriod, setIsAvaibleFreePeriod] = useState(false);
  const [isOnFreePeriod, setIsOnFreePeriod] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneNumber = "523841096853";
  const message = "quiero link de pago";

  const getTitleFreeTrial = isAvaibleFreePeriod
    ? "Nuestro periodo de pruebas es de 30 dias, disfruta de :"
    : !isAvaibleFreePeriod && isOnFreePeriod
    ? "Ya estas en el periodo de prueba, disfruta de Omaka 🤩🚀"
    : "Ya pasaron 30 días de prueba 😔,\nPero puedes probar nuestra app 📲";

  const getDescriptionFreeTrial = isAvaibleFreePeriod
    ? "Gracias por elegir Omaka Negocios, recuerda que en cualquier momento puedes acceder a soporte en tiempo real a travez de nuestro WhatsApp"
    : !isAvaibleFreePeriod && isOnFreePeriod
    ? "tranquilo aun te quedan algunos dias mas para seguir disfrutando de Omaka Negocios"
    : "  Para seguir usando Omaka Negocio es necesario realizar el pago, mediante Stripe, para obtener el link de pago envia un mensaje de WhatsApp presionando el boton de abajo, y escribe quiero link de pago";

  useEffect(() => {
    getUserData(false);
  }, []);

  const getUserData = async (update: boolean) => {
    setLoading(true);
    const userData = await getUser(getAuth().currentUser?.uid);
    if (update) {
      dispatch({ type: "setUserData", payload: userData });
    }
    if (userData) {
      checkToAvaibleFreeTrial(userData.DatosPersonales);
    } else {
      signOut(getAuth());
    }
    setLoading(false);
  };

  const checkToAvaibleFreeTrial = async (
    DatosPersonales: UserType["DatosPersonales"]
  ) => {
    if (DatosPersonales.trialEndDate) {
      const isOnFree = isFreePeriod(
        DatosPersonales.fechaCreacion,
        DatosPersonales.trialEndDate
      );
      setIsOnFreePeriod(isOnFree);
    } else {
      setIsAvaibleFreePeriod(true);
    }
  };

  const getFreeMonth = async () => {
    setLoading(true);
    const resBack = await setFreeTrial(getAuth().currentUser?.uid);
    if (resBack.status == "OK") {
      getUserData(true);
      setTimeout(() => {
        goDashboard();
      }, 3000);
    } else {
      toast.error(
        "No puedes acceder a periodo de prueba, intenta en un momento!"
      );
    }
    setLoading(false);
  };

  const goDashboard = () => {
    navigate("/panel/pedidos");
  };

  const goToWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    );
  };

  const getBtnFreeTrial = () => {
    if (isAvaibleFreePeriod) {
      return (
        <Buttons
          loading={loading}
          action={getFreeMonth}
          width="100%"
          color={Colors().chalchihuitl400}
          text="Iniciar prueba"
          type="primary"
        />
      );
    }
    if (!isAvaibleFreePeriod && isOnFreePeriod) {
      return (
        <Buttons
          loading={loading}
          action={goDashboard}
          width="100%"
          color={Colors().chalchihuitl400}
          text="Ir al panel"
          type="primary"
        />
      );
    } else {
      return (
        <Buttons
          loading={loading}
          action={goToWhatsApp}
          width="100%"
          color={Colors().chalchihuitl400}
          text="Enviar WhatsApp al +523841096853"
          type="primary"
        />
      );
    }
  };

  return (
    <div className="free-container">
      <div className="paper-free-trial">
        <img className="logo-free-trial" src={logoImg} />
        <h1 className="title-free-trial">¡Prueba Omaka ahora!</h1>
       {loading?
        <div>
            <Loading/>
        </div>
        :
        <div>
        <div style={{ whiteSpace: "pre-line" }} className="header-free-trial">
        <Typography color={Colors().akostik050} variant="title">
            {getTitleFreeTrial}
        </Typography>
        <Typography color={Colors().akostik050} variant="title">
            {`Omaka ${!isAvaibleFreePeriod && !isOnFreePeriod ? 'Individual' : 'Negocios' } 😊`}
        </Typography>
        </div>
        <Typography color={Colors().akostik050} variant="subTitle">
        {getDescriptionFreeTrial}
        </Typography>
        <div className="btn-container-free-trial">
        {getBtnFreeTrial()}
        </div>
    </div>
       }
      </div>
    </div>
  );
};

export default PanelFreeTrial;
