export interface RateType {
    Pedidos?:Array<string>
    creador:{
        id: string;
        name: string;
        foto?: string;
    }
    fechaCreacion: any;
    idRuta: string;
    fechaEntrega: any;
    fechaInicio: any;
    fechaTermino: any;
    nombreRuta: string;
    pedidosDetenidos: number;
    pedidosEntregados: number;
    repartidor: {
        id : string;
        name : string;
        foto?: string;
    }
    status: string;
}

export interface RateTypeForm {
    Pedidos?:Array<string>
    fechaEntrega: any;
    nombreRuta: string;
    creador:{
        id: string;
        name: string;
        foto?: string;
    };
    repartidor?: {
        id : string;
        name : string;
        foto?: string;
    }
}

export interface RateTypeFormSimple {
    Pedidos?:Array<string>
    fechaEntrega: any;
    nombreRuta: string;
    repartidor?: {
        id : string;
        name : string;
        foto?: string;
    }
}
