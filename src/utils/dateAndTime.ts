import { differenceInHours, differenceInMinutes } from "date-fns";

export const getDateAndHour = (dateCreation: any) => {
  const convertedDate = new Date(
    dateCreation._seconds * 1000 + dateCreation._nanoseconds / 1000000
  );
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

export const getTimeDifference = (fechaInicio : any, fechaEntrega: any) =>  {
  if(fechaInicio && fechaEntrega){
      const convertedInicio = new Date(fechaInicio._seconds * 1000 + fechaInicio._nanoseconds / 1000000);
      const convertedEntrega = new Date(fechaEntrega._seconds * 1000 + fechaEntrega._nanoseconds / 1000000);
      if(differenceInHours(convertedEntrega,convertedInicio) < 1 ){
          return(differenceInMinutes(convertedEntrega,convertedInicio) + ' min(s)');
      }else{
       return(differenceInHours(convertedEntrega,convertedInicio)+ ' hora(s)');
      }
  }else{
      return('N/A')
  }

}