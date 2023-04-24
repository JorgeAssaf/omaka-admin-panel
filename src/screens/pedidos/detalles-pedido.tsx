import React, { useState } from 'react';
import { InformationChip } from '../../components/atoms/information-chip';
import LabelInput from '../../components/atoms/label-input';
import './styles.css';
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import MapView from '../../components/map/MapView';
import { PointType } from '../../types/typesMap';
import { editOrder,deleteOrder } from '../../api/ordersQuerys';
import { toast } from "react-toastify";

type DetallesPedidosInterface = {
    datosPedidos: DatosPedidos;
    cerrarDrawer: any;
    refreshOrders: any;
}

type DatosPedidos = {

    direccionPedido: string;
    fechaCreacion: any;
    idPedido: string;
    idUsuario: string;
    nombreCliente: string;
    notaDePedido: string;
    status: string;
    telefonoPedido: string;
    ubicacionPedido: any;


}

export const DetallesPedidos = ({ datosPedidos, cerrarDrawer, refreshOrders }: DetallesPedidosInterface) => {

    const [direccionPedido, setDireccionPedido] = useState(datosPedidos?.direccionPedido);
    const [nombreCliente, setNombreCliente] = useState(datosPedidos?.nombreCliente);
    const [notaDePedido, setNotaDePedido] = useState(datosPedidos?.notaDePedido);
    const [telefonoPedido, setTelefonoPedido] = useState(datosPedidos?.telefonoPedido);
    const [ubicacionPedido, setUbicacionPedido] = useState(datosPedidos?.ubicacionPedido);
    const [disabledInput, setDisableInput] = useState(true);
    const [showBotonera, setShowBotonera] = useState(datosPedidos?.status || 'pending')

    const [datosPedidosEdit, setDatosPedidosEdit] = useState(datosPedidos)

    const editarPedido = () => {
        setDisableInput(false);
        setShowBotonera('editar');
    };
    const eliminarPedido  = async() => {
        try {
            let respuesta= await deleteOrder(datosPedidosEdit,datosPedidosEdit.idUsuario,true)
            console.log(respuesta);
            if(respuesta.status =='OK'){
                toast.success('Pedido eliminado');
                cerrarDrawer();
                refreshOrders();
            }
            else{
                toast.success('Ocurrió un error');
            }
        } catch (err) {
            toast.success('Ocurrió un error');
            console.log(err);
        }

    }

    const guardarPedido = () => {
        editOrder(datosPedidosEdit)
        cerrarDrawer();
        refreshOrders();
    }

    const handleChangeNombreCliente = (e) => {
        setNombreCliente(e);
        setDatosPedidosEdit({ ...datosPedidosEdit, nombreCliente: e })
    }
    const handleChangeTelefono = (e) => {
        setTelefonoPedido(e);
        setDatosPedidosEdit({ ...datosPedidosEdit, telefonoPedido: e })

    }
    const handleChangeNota = (e) => {
        setNotaDePedido(e);
        setDatosPedidosEdit({ ...datosPedidosEdit, notaDePedido: e })

    }

    const botonera =
    {
        pending: <BotoneraSinruta EditarPedido={editarPedido} EliminarPedido={eliminarPedido} />,
        editar: <BotoneraEditar GuardarPedido={guardarPedido} CancelarEditar={cerrarDrawer} />
    }

    return (
        <div className='detalles-container'>
            <div className='row-information'>
                {datosPedidos?.idPedido}
                <InformationChip text={datosPedidos?.status} />
            </div>
            <div>
                <div className='row-information-client'>
                    <LabelInput
                        inputProps={{ disabled: disabledInput }}
                        value={nombreCliente}
                        onChange={handleChangeNombreCliente}
                        label="Nombre"
                    />
                    <LabelInput
                        inputProps={{ disabled: disabledInput }}
                        value={telefonoPedido}
                        onChange={handleChangeTelefono}
                        label="Telefono"
                    />
                </div>
                <LabelInput
                    inputProps={{ disabled: true }}
                    value={direccionPedido}
                    onChange={handleChangeNota}
                    label="Direccion"
                />
                <LabelInput
                    inputProps={{ disabled: disabledInput }}
                    value={notaDePedido}
                    onChange={handleChangeNota}
                    label="Notas"
                />
            </div>
            <div className='map-wrap'>
                {
                    datosPedidos ?
                        <MapView points={[datosPedidos]} />
                        :
                        <div />
                }
            </div>
            <div className='bottom-section'>
                <div className='botonera'>
                    {botonera[showBotonera]}
                </div>

            </div>
        </div>
    );
}

const BotoneraSinruta = ({ EditarPedido, EliminarPedido }) => (
    <div className='botonera-container'>
        <Buttons
            textColor={Colors().tliltik}
            color={Colors().iztac}
            text="Atras"
            type="primary"
            action={() => null} />
        <div className='botones-principales'>
            <Buttons
                textColor={Colors().iztac}
                color={Colors().chalchihuitl400}
                text="Enviar a ruta"
                type="primary"
                action={() => null} />
            <div className='segunda-fila'>
                <Buttons
                    textColor={Colors().iztac}
                    color={Colors().zacatazcalli300}
                    text="Editar"
                    type="primary"
                    action={EditarPedido}
                    width='95%' />
                <Buttons
                    textColor={Colors().iztac}
                    color={Colors().xochipaltic400}
                    text="Eliminar11"
                    type="primary"
                    action={EliminarPedido}
                    width='95%' />
            </div>
        </div>

    </div>
);
const BotoneraEditar = ({ GuardarPedido, CancelarEditar }) => (
    <div>
        <div className='segunda-fila'>
            <Buttons
                textColor={Colors().iztac}
                color={Colors().chalchihuitl400}
                text="Guardar"
                type="primary"
                action={GuardarPedido}
                width='95%' />
            <Buttons
                textColor={Colors().iztac}
                color={Colors().xochipaltic400}
                text="Cancelar"
                type="primary"
                action={CancelarEditar}
                width='95%' />
        </div>
    </div>
);