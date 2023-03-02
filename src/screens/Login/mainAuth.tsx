import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./login";
import RegistrationForm from "./register";
import 'react-toastify/dist/ReactToastify.css';

const MainAuth = () => {
  const [screenShow, setScreenShow] = useState("login");

  return (
    <div>
      {screenShow == "login" ? (
        <Login setScreenShow={setScreenShow} />
      ) : (
        <RegistrationForm setScreenShow={setScreenShow} />
      )}
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </div>
  );
};

export default MainAuth;
