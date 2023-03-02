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
