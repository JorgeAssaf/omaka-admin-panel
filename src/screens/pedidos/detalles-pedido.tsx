import React from 'react';
import { InformationChip } from '../../components/atoms/information-chip';
import LabelInput from '../../components/atoms/label-input';
import './styles.css';
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";

type DetallesPedidosInterface = {
    datosPedidos?: DatosPedidos;
}

type DatosPedidos = {

    direccionPedido: string;
    fechaCreacion: any;
    idPedido: string;
    idUsuario: string;
    nombreCliente: string;
    notaDePedido: string;
    status:string;
    telefonoPedido: string;
    ubicacionPedido:any;


}

export const DetallesPedidos = ({datosPedidos} : DetallesPedidosInterface) => {

    const botonera =
{       
    pending: <BotoneraSinruta />,
}

    return(
        <div className='detalles-container'>
            <div className='row-information'>
            {datosPedidos?.idPedido} 
            <InformationChip text={datosPedidos?.status} />
            </div>
            <div>
                <div className='row-information-client'>
                <LabelInput 
                inputProps={{ disabled: true }}
                value={datosPedidos?.nombreCliente}
                onChange={() => null}
                label="Nombre"
                />
            <LabelInput 
                inputProps={{ disabled: true }}
                value={datosPedidos?.telefonoPedido}
                onChange={() => null}
                label="Telefono"
                />
                </div>
            <LabelInput 
                inputProps={{ disabled: true }}
                value={datosPedidos?.direccionPedido}
            onChange={() => null}
            label="Direccion"
            />
            <LabelInput 
                inputProps={{ disabled: true }}
                value={datosPedidos?.notaDePedido}
            onChange={() => null}
            label="Notas"
            />
            </div>
            <div className='bottom-section'>
                <div className='botonera'>
                    {botonera[datosPedidos ? datosPedidos.status : 'pendiente' ]}
                </div>

            </div>
        </div>
    );
}

const BotoneraSinruta = () =>(
    <div className='botonera-container'>
        <Buttons
        textColor={Colors().tliltik}
        color={Colors().iztac}
        text="Atras"
        type="primary"
        action={() => null}/>
        <div className='botones-principales'>
        <Buttons
        textColor={Colors().iztac}
        color={Colors().chalchihuitl400}
        text="Enviar a ruta"
        type="primary"
        action={() => null}/>
        <div className='segunda-fila'>
        <Buttons
        textColor={Colors().iztac}
        color={Colors().zacatazcalli300}
        text="Editar"
        type="primary"
        action={() => null}
        width='95%'/>
        <Buttons
        textColor={Colors().iztac}
        color={Colors().xochipaltic400}
        text="Eliminar"
        type="primary"
        action={() => null}
        width='95%'/>
        </div>
        </div>
        
    </div>
);