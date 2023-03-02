export interface RateType {
    Pedidos?:Array<string>
    creador:{
        id: string;
        name: string;
    }
    fechaCreacion: any;
    fechaEntrega: any;
    nombreRuta: string;
    pedidosDetenidos: number;
    pedidosEntregados: number;
    repartidor: {
        id : string;
        name : string;
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
    };
    repartidor?: {
        id : string;
        name : string;
    }
}

export interface RateTypeFormSimple {
    Pedidos?:Array<string>
    fechaEntrega: any;
    nombreRuta: string;
    repartidor?: {
        id : string;
        name : string;
    }
}
