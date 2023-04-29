export interface OrderType {
    direccionPedido : string;
    esUrgentePedido : boolean;
    fechaCreacion : any;
    fechaEntrega? : any;
    ruta : {
        idRuta: string;
        nombreRuta: string;
        fechaEntrega: any;
    } | undefined;
    idUsuario  : string;
    nombreCliente : string;
    notaDePedido : string;
    status : string;
    orderSaved: boolean;
    telefonoPedido : string;
    ubicacionPedido : {
        lat: number;
        lng: number;
    }
    isInProgress?:boolean;
    idPedido:string;
    report? : {
        dateReport: any;
        messageReport: string;
        reportFor: string;
    }
}

export interface OrderTypeForm {
    direccionPedido : string;
    nombreCliente : string;
    notaDePedido : string;
    telefonoPedido : string;
    orderSaved?: boolean;
    ubicacionPedido : {
        lat: number;
        lng: number;
    }
}


export interface ClientType {
    direccionPedido : string;
    nombreCliente : string;
    idCliente  : string;
    idUsuario  : string;
    fechaCreacion : any;
    telefonoPedido : string;
    ubicacionPedido : {
        lat: number;
        lng: number;
    }
    Reports? : [];
}

