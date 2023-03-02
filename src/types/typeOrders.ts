export interface OrderType {
    direccionPedido : string;
    esUrgentePedido : boolean;
    fechaCreacion : any;
    ruta : {
        idRuta: string;
        nombreRuta: string;
        fechaEntrega: any;
    } | undefined;
    idUsuario  : string;
    nombreCliente : string;
    notaDePedido : string;
    status : string;
    telefonoPedido : string;
    ubicacionPedido : {
        lat: number;
        lng: number;
    }
    isInProgress?:boolean;
    idPedido:string;
}

export interface OrderTypeForm {
    direccionPedido : string;
    nombreCliente : string;
    notaDePedido : string;
    telefonoPedido : string;
    ubicacionPedido : {
        lat: number;
        lng: number;
    }
}
