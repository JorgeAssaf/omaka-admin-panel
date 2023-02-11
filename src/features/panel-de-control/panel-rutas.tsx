import React from 'react';
import { GeneralStructure } from '../../components/general/structure-page'
import { CardList } from '../../components/general/cards-list';

export const PanelRutas =() =>{

    const data={
        0: 
        {
        idPedido: '14-1317321',
        status: 'Entregado',
        primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
        segundoTexto: 'Eugenia Castillo',
        tipo: 'ruta',
        progressRute: 20,
        distancia:  '20km.',
    },
        1:{
            idPedido: '14-1317321',
            status: 'Pendiente',
            primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
            segundoTexto: 'Eugenia Castillo',
            tipo: 'ruta',
            progressRute: 20,
        },
        2:{
            idPedido: '14-1317321',
            status: 'Entregado',
            primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
            segundoTexto: 'Eugenia Castillo',
            tipo: 'ruta',
            progressRute: 20,
            distancia:  '20km.',
        },
        3:{
            idPedido: '14-1317321',
            status: 'Pendiente',
            primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
            segundoTexto: 'Eugenia Castillo',
            tipo: 'ruta',
            progressRute: 20,
        },
        
      };

      const card = <CardList data={data} />;
      const image = <img src='https://cdn-3.expansion.mx/dims4/default/b77fb0a/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2012%2F06%2F20%2Ftrafico-transito-google-maps-ciudad-de-mexico.jpg' />

    return(
        <GeneralStructure contentLeft={card} contentRight={image} isMobile={false} />
    );
}