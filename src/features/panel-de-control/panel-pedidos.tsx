import React from 'react';
import { GeneralStructure } from '../../components/general/structure-page/structure-page'
import { CardInformacion } from '../../components/cards/informacion/component';

export const PanelPedidos = () =>{
    const data={
        idPedido: '14-1317321',
        status: 'Entregado',
        primerTexto: 'Calle Tabachín 45, Tlaquepaque, Jal. 857263', 
        segundoTexto: 'Ramira Romo',
        tipo: 'pedido',
        progressRute: 20,
      }
      
      const card = <CardInformacion data={data} />;
    
      return(
        <GeneralStructure contentLeft={card} contentRight={card} isMobile={true} />
      );
}