export interface typeMapView{
    points:PointType[],
    screenShow?:string,
    newPedido?:Array<any>
}


export interface PointType {
  ubicacionPedido: {
    lat: number;
    lng: number;
  };
  nombre?: string;
  status?: string;
  velocidad?: number;
}
