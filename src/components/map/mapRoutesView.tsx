import { useState, useEffect } from "preact/hooks";
import GoogleMapReact from "google-map-react";

import mapsStyle from "./mapsStyle.json";
import { typeMapView, PointType } from "../../types/typesMap";
import { RootState } from "../../redux/reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import "./MapView.css";
import Colors from "../../utils/colors";
import { SvgIcon } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";
import { getLastUpdate } from "../../utils/dateAndTime";
import DeliveryManMarker from "../atoms/mapsMarkers/deliveryManMarker";

let generalMap;
let generalMaps;
let generalPoints;
let directionsDisplay;
const Marker = ({ color, lat, lng }) => (
  <div
    style={{
      backgroundColor: color,
      width: "1rem",
      height: "1rem",
      borderRadius: "50%"
    }}
  ></div>
);

const MarkerUser = ({ color, kmh, lastUpdate, lat, lng }) => (
  <div className="deliveryMarker">
    <div className="kmh-indicator">{parseInt(kmh)} km/h <br /> hace {getLastUpdate(lastUpdate)}</div>

    <SvgIcon
      component={DirectionsCar}
      fontSize="small"
      htmlColor={Colors().texotli300}
    />
  </div>
);

function MapViewRoutes({ points, repartidorUbicaciones }: typeMapView) {
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
      if (directionsDisplay) {
        directionsDisplay.setMap(null);
      }
      apiIsLoaded(generalMap, generalMaps, points);
    }
  }, [points]);

  const apiIsLoaded = (map, maps, points) => {
    generalMap = map;
    generalMaps = maps;
    generalPoints = points;
    if (maps) {
      let bounds = new maps.LatLngBounds();
      let waypoints = [] as any;
      if (points.length > 0) {
        points.forEach((marker, key) => {
          if (key != 0 && key != points.length - 1) {
            waypoints.push({
              location: marker.ubicacionPedido,
              stopover: true
            });
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
            strokeColor: points[0] ? points[0].color : Colors().chalchihuitl400,
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
              points[points.length - 1].ubicacionPedido.lat,
              points[points.length - 1].ubicacionPedido.lng
            ),
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: generalMaps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === generalMaps.DirectionsStatus.OK) {
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
        {repartidorUbicaciones.length > 0
          ? repartidorUbicaciones.map((it) => {
            return (
              <DeliveryManMarker
                lat={it.latitude}
                lng={it.longitude}
                color={it.color}
                kmh={it.speed}
                lastUpdate={it.lastUpdate}
                title={it.title}
              />
            );
          })
          : null}
      </GoogleMapReact>
    </div>
  );
}

export default MapViewRoutes;
