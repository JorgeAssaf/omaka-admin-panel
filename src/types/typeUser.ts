
export interface UserType {
    DatosPersonales:{
        apellido: string;
        correo: string;
        fechaCreacion?: string;
        nombreEmpresa: string;
        direccionEmpresa: string;
        industriaEmpresa: string;
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
    Pedidos?:Array<string>
    Productos?:Array<string>
    Rutas?:Array<string>
}