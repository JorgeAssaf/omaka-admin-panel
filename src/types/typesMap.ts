export interface typeMapView{
    points:PointType[],
    screenShow?:string,
    repartidorUbicaciones?: any;
    repartidorFocus?: boolean;
    newPedido?:Array<any>
}


export interface PointType {
  ubicacionPedido: {
    lat: number;
    lng: number;
  };
  nombre?: string;
  color?: string;
  status?: string;
  velocidad?: number;
}
