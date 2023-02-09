import React from 'react';
import { GeneralStructure } from '../../components/general/structure-page/structure-page'
import { CardInformacion } from '../../components/cards/informacion/component';

export const PanelRutas =() =>{

    const data={
        idPedido: '14-1317321',
        status: 'Entregado',
        primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
        segundoTexto: 'Eugenia Castillo',
        tipo: 'ruta',
        progressRute: 20,
      }

      const card = <CardInformacion data={data} />;

    return(
        <GeneralStructure contentLeft={card} contentRight={card} isMobile={true} />
    );
}