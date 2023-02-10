import React from 'react';
import { GeneralStructure } from '../../components/general/structure-page'
import { CardInformacion } from '../../components/general/general-card';

export const PanelRutas =() =>{

    const data={
        idPedido: '14-1317321',
        status: 'Entregado',
        primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
        segundoTexto: 'Eugenia Castillo',
        tipo: 'ruta',
        progressRute: 20,
        distancia:  '20km.',
      }

      const card = <CardInformacion data={data} />;

    return(
        <GeneralStructure contentLeft={card} contentRight={card} isMobile={false} />
    );
}