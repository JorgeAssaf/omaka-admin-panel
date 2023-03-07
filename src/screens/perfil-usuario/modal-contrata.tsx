import React from 'react';
import { Modal, Box } from '@mui/material';
import { Buttons } from '../../components/atoms/buttons';
import Colors from "../../utils/colors";
import { DescripcionPlan } from './descripcion-plan';

type ModalContrataInterface = {
    open: boolean,
    onClose: any,
    nivel: string,

}

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline:0,
}

export const ModalContrata = ({open, onClose, nivel}: ModalContrataInterface) => {
    
    return(
    <div>
<Modal
  open={open}
  onClose={onClose}
  aria-labelledby="Contrata plan"
  aria-describedby="Contrata otro plan distinto al tuyo"
>
  <Box sx={styleModal}>
    <div className='modal-contrata'>
        <div className='content-modal'>
          <div className='encabezado-modal'>
            Cambiate a Omaka
           { nivel === 'basic' ? ' Premium ' : ' Basic '}
           y obten nuevos beneficios
          </div>
        <DescripcionPlan nivel='Premium' />

        <Buttons
          action={() => onClose(false)}
          text='Contrata Premium'
          type="primary"
          color={Colors().chalchihuitl200}
          textColor={Colors().tizatl600}
          />
        </div>
    </div>
  </Box>
</Modal>
</div>)
}