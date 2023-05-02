const initalState = {
  userData: {
    DatosPersonales: {
      apellido: "",
      correo: "",
      fechaCreacion: {},
      fechaNacimiento: "",
      industriaEmpresa:"",
      idUsuario: "",
      nombre: "",
      nombreEmpresa: "",
      password: "",
      status: 0,
      telefono: "",
      trialEndDate:"",
    },
    Nivel: "",
    Pedidos: [],
    Productos: [],
    Rutas: []
  },
  sectionActive:'pedidos',
};

//* reducer
export default (state = initalState, action: any) => {
  switch (action.type) {
    case "setUserData":
      return { ...state, userData: action.payload };
    case "setSectionActive":
      return { ...state, sectionActive: action.payload };
    case "cleanUserReduce":
      return initalState;
    default:
      return state;
  }
};
