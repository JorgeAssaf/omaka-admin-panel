import { differenceInHours, differenceInMinutes, differenceInSeconds, differenceInDays } from "date-fns";

export const convertDateFormFirebase = (fecha: any) => {
  if (fecha.seconds) {
    return (new Date(fecha.seconds * 1000 + fecha.nanoseconds / 1000000));
  }
  else if (fecha._seconds) {
    return (new Date(fecha._seconds * 1000 + fecha._nanoseconds / 1000000));
  } else {
    return (new Date())
  }
}

export const getDateAndHour = (dateCreation: any) => {
  const convertedDate = convertDateFormFirebase(dateCreation)
  let day =
    convertedDate.getDate() <= 9
      ? "0" + convertedDate.getDate()
      : convertedDate.getDate();
  let month =
    convertedDate.getMonth() + 1 <= 9
      ? "0" + (convertedDate.getMonth() + 1)
      : convertedDate.getMonth() + 1;
  let year =
    convertedDate.getFullYear() <= 9
      ? "0" + convertedDate.getFullYear()
      : convertedDate.getFullYear();

  let hours =
    convertedDate.getHours() <= 9
      ? "0" + convertedDate.getHours()
      : convertedDate.getHours();
  let minutes =
    convertedDate.getMinutes() <= 9
      ? "0" + convertedDate.getMinutes()
      : convertedDate.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};



export const getTimeDifference = (fechaInicio: any, fechaEntrega: any) => {
  if (fechaInicio && fechaEntrega) {
    const convertedInicio = convertDateFormFirebase(fechaInicio);
    const convertedEntrega = convertDateFormFirebase(fechaEntrega);

    const differenceInDaysValue = differenceInDays(convertedEntrega, convertedInicio);

    if (differenceInDaysValue < 1) {
      const differenceInHoursValue = differenceInHours(convertedEntrega, convertedInicio);
      if (differenceInHoursValue < 1) {
        const differenceInMinutesValue = differenceInMinutes(convertedEntrega, convertedInicio);
        return differenceInMinutesValue + ' min(s)';
      } else {
        return differenceInHoursValue + ' hora(s)';
      }
    } else {
      return differenceInDaysValue + ' día(s)';
    }
  } else {
    return new Date()
  }
};

export const getLastUpdate = (fechaInicio: any) => {
  if (fechaInicio) {
    const convertedInicio = convertDateFormFirebase(fechaInicio);
    const convertedCurrent = new Date();

    const differenceInDaysValue = differenceInDays(convertedCurrent, convertedInicio);

    if (differenceInDaysValue < 1) {
      const differenceInHoursValue = differenceInHours(convertedCurrent, convertedInicio);
      if (differenceInHoursValue < 1) {
        const differenceInMinutesValue = differenceInMinutes(convertedCurrent, convertedInicio);
        return differenceInMinutesValue + ' min(s)';
      } else {
        return differenceInHoursValue + ' hora(s)';
      }
    } else {
      return differenceInDaysValue + ' día(s)';
    }
  } else {
    return new Date()
  }
};




export function esMayorDeEdad(fechaNacimiento: any) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad >= 18;
}

//metodo regresa si el usuario esta en periodo de prueba
export const isFreePeriod = (fechaCreacion: any, trialEndDate: any) => {
  if (fechaCreacion && trialEndDate) {
    const convertedInicio = convertDateFormFirebase(fechaCreacion);
    const convertedEntrega = convertDateFormFirebase(trialEndDate);
    if (differenceInHours(convertedEntrega, convertedInicio) <= 0) {
      return (false);
    } else {
      return (true);
    }
  } else {
    return (false)
  }

}