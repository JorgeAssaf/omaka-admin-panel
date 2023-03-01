export interface typeMapView {
  points: PointType[];
}
export interface PointType {
  ubicacion: {
    lat: number;
    lng: number;
  };
  nombre?: string;
  status?: string;
  velocidad?: number;
}
