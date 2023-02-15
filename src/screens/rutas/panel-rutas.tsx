import React from "react";
import { CardList } from "../../components/general/cardList/cards-list";
import './styles.css';
export const PanelRutas = () => {
  const data = [
    {
      idPedido: "14-1317321",
      status: "Entregado",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20,
      distancia: "20km."
    },
    {
      idPedido: "14-1317321",
      status: "Pendiente",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20
    },
    {
      idPedido: "14-1317321",
      status: "Entregado",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20,
      distancia: "20km."
    },
    {
      idPedido: "14-1317321",
      status: "Pendiente",
      primerTexto: "Calle Tabachín 45, Tlaquepaque, Jal. 857263",
      segundoTexto: "Eugenia Castillo",
      tipo: "ruta",
      progressRute: 20
    }
  ];


  return (
    <div className='rutas_container'>
      <div className='lista_container'>
        <CardList data={data} />
      </div>
      <div className='mapa_container'>
        <img style={{width:'100%'}} src='https://cdn-3.expansion.mx/dims4/default/b77fb0a/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2012%2F06%2F20%2Ftrafico-transito-google-maps-ciudad-de-mexico.jpg' />
      </div>
    </div>
  );
};
