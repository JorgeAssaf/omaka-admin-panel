import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import mapsStyle from "./mapsStyle.json";
import { typeMapView, PointType } from "../../types/typesMap";
import { RootState } from "../../redux/reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import "./MapView.css";
import Colors from "../../utils/colors";

let generalMap;
let generalMaps;
let generalPoints;
let directionsDisplay;
const Marker = ({ color, lat, lng }) => (
  <div
    style={{
      backgroundColor: color,
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "50%"
    }}
  >
    {" "}
  </div>
);

function MapViewRoutes({ points }: typeMapView) {
  const [puntosArray, setPuntosArray] = useState<PointType[]>([]);
  const newPedido = useSelector(
    (state: RootState) => state.pedidos.newPedidoUbicacion as any
  );
  const dispatch = useDispatch();

  const defaultProps = {
    center: {
      lat: 20.6665706,
      lng: -103.3917025
    },
    zoom: 15
  };

  useEffect(() => {
    setPuntosArray(points);
    if (points.length > 0) {
      if(directionsDisplay){
        directionsDisplay.setMap(null);
      }
      apiIsLoaded(generalMap, generalMaps, points);
    }
  }, [points]);

  const apiIsLoaded = (map, maps, points) => {
    generalMap =  map;
    generalMaps = maps;
    generalPoints = points;
    if (maps) {
      let bounds = new maps.LatLngBounds();
      let waypoints=[];
      if (points.length > 0) {
        console.log(points)
        points.forEach((marker,key) => {
          
          if(key!=0 && key!=points.length-1){
            waypoints.push({
              location:marker.ubicacionPedido,
              stopover: true,
            })
          }
          bounds.extend(marker.ubicacionPedido);
        });
        map.fitBounds(bounds);
        const DirectionsService = new generalMaps.DirectionsService();

         directionsDisplay = new generalMaps.DirectionsRenderer({
          suppressMarkers: false,
          suppressBicyclingLayer: true
        });

        directionsDisplay.setOptions({
          polylineOptions: {
            strokeColor: "#ff85a2",
            strokeWeight: "5",
            strokeOpacity: "0.7"
          }
        });

        directionsDisplay.setMap(generalMap);
        
        DirectionsService.route(
          {
            origin: new generalMaps.LatLng(
              points[0].ubicacionPedido.lat,
              points[0].ubicacionPedido.lng
            ),


            destination: new generalMaps.LatLng(
              points[points.length-1].ubicacionPedido.lat,
              points[points.length-1].ubicacionPedido.lng
            ),
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: generalMaps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === generalMaps.DirectionsStatus.OK) {
              console.log(result);
              directionsDisplay.setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }
  };

  return (
    <div className="containerMap">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_KEY_MAPS,
          libraries: ["places"]
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ styles: mapsStyle }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, points)}
      >
        {puntosArray.map((it) => {
          return (
            <Marker
              lat={it.ubicacionPedido.lat}
              lng={it.ubicacionPedido.lng}
              color={it.color ? it.color : Colors().zacatazcalli300}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapViewRoutes;
