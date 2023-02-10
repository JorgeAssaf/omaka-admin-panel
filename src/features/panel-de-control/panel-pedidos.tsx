import React from 'react';
import { GeneralStructure } from '../../components/general/structure-page'
import { CardInformacion } from '../../components/general/general-card';

export const PanelPedidos = () =>{
    const data={
        idPedido: '14-1317321',
        status: 'En ruta',
        primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
        segundoTexto: 'Ramira Romo',
        tipo: 'pedido',
        progressRute: 20,
      }
      
      const card = <CardInformacion data={data} />;
      const image = <img src='https://cdn-3.expansion.mx/dims4/default/b77fb0a/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2012%2F06%2F20%2Ftrafico-transito-google-maps-ciudad-de-mexico.jpg' />
    
      return(
        <GeneralStructure contentLeft={card} contentRight={image} isMobile={false} />
      );
}