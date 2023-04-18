import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./app.css";
//,{ubicacionPedido:{lat:24.141141,lng:-204.9012558}}

import AppRouter from "./routes/routes";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { useDeviceUser } from "./hooks/useMobile";

export function App() {
  const [showModalMobile, setShowModalMobile] = useState(false);
  const [isMobile] = useDeviceUser();

  useEffect(() => {
    setShowModalMobile(isMobile);
  }, [isMobile]);

  return (
    <Provider store={Store}>
      {showModalMobile ? (
        <ModalSimple
          title="Para una mejor experiencia abre el dashboard en una computadora"
          subtitle="Algunas funciones no estan hechas para funcionar en movil."
          onClose={() => setShowModalMobile(false)}
        />
      ) : null}
      <AppRouter />
    </Provider>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
