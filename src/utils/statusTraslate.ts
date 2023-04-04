export const statusRepartidor = (status: string | undefined) => {
  if (status) {
    let newStatus = "Libre";
    switch (status) {
      case "free":
        newStatus = "Libre";
        break;
      case "expirate":
        newStatus = "Renovar";
        break;
      case "inRate":
        newStatus = "En ruta";
        break;
      case "inactive":
        newStatus = "Inactivo";
        break;
      default:
        break;
    }
    return(newStatus);
  } else {
    return "Libre";
  }
};


export const statusPedido = (status: string | undefined) => {
  if (status) {
    let newStatus = "Pendiente";
    switch (status) {
      case "finish":
        newStatus = "Entregado";
        break;
      case "stop":
        newStatus = "Detenido";
        break;
      case "inProgress":
        newStatus = "En Proceso";
        break;
      default:
        break;
    }
    return(newStatus);
  } else {
    return "Pendiente";
  }
};

export const statusRuta = (status: string | undefined) => {
  if (status) {
    let newStatus = "Pendiente";
    switch (status) {
      case "finish":
        newStatus = "Terminada";
        break;
      case "stopped":
        newStatus = "Detenida";
        break;
      case "inProgress":
        newStatus = "En Proceso";
        break;
      default:
        break;
    }
    return(newStatus);
  } else {
    return "Pendiente";
  }
};
