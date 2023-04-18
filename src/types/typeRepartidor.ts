import { PointType } from "./typesMap";

export interface RepartidorType {
    DatosPersonales:{
        apellido: string;
        correo: string;
        fechaCreacion?: string;
        fechaNacimiento: string;
        idUsuario?: string;
        foto?: string;
        nombre: string;
        password: string;
        status?: number;
        telefono: string;
    };
    creador?:{
        name: string;
        id: string;  
    };
    Ubicacion?: any
    Pedidos?:Array<string>
    Productos?:Array<string>
    Rutas?:Array<string>
}

export interface RepartidorTypeForm {
    apellido: string;
    correo: string;
    fechaNacimiento: string;
    nombre: string;
    password: string;
    telefono: string;
    foto?:string;
    creador?:{
        name: string;
        id: string;  
    };
}

