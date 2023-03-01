import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import mapsStyle from './mapsStyle.json';
import { typeMapView } from '../../types/typesMap';
import { RootState } from "../../redux/reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import './MapView.css';


const Marker = ({ color, lat, lng }) => <div style={{ backgroundColor: color, width: '1.5rem', height: '1.5rem', borderRadius: '50%' }}> </div>
let generalMap;
let generalMaps;
let generalPoints;
let ban=false;
function MapView({ points, screenShow }: typeMapView) {
  const [puntosArray, setPuntosArray] = useState<typeMapView[]>([]);
  const newPedido = useSelector((state: RootState) => state.pedidos.newPedidoUbicacion as any);
  const dispatch = useDispatch();

  const defaultProps = {
    center: {
      lat: 20.6665706,
      lng: -103.3917025
    },
    zoom: 15
  };
  useEffect(() => {
      setPuntosArray(points)
  }, []);

 
  useEffect(() => {

    if (screenShow == 'new') {
      setPuntosArray([])
    }
    else{
      setPuntosArray(points)
      if(ban){
        apiIsLoaded(generalMap,generalMaps,points);
      }
      else{
        ban=true;
      }

    }
}, [screenShow]);

  useEffect(()=>{
    if (screenShow == 'new') {
      setPuntosArray(newPedido);
      apiIsLoaded(generalMap,generalMaps,newPedido);
    }

  },[newPedido])




  const apiIsLoaded = (map, maps, points) => {
    generalMap=map;
    generalMaps=maps;
    generalPoints=points;
    let bounds = new maps.LatLngBounds();
    points.forEach(marker => {
      bounds.extend(marker.ubicacionPedido);

    });
    map.fitBounds(bounds)
  }
  const addPoint = ({ x, y, lat, lng, event }) => {
    if (screenShow == 'new') {
      
      let nuevo = { ubicacionPedido: { lat: lat, lng: lng } }
      dispatch({ type: 'setNewBound', payload: nuevo });
      setPuntosArray((prevState) => {
        let result = [nuevo];
        return result;
      });

    }

  }


  return (
    <div className='containerMap'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_KEY_MAPS,libraries:['places'] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ styles: mapsStyle }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, points)}
        onClick={addPoint}
      >
        {
          puntosArray.map((it) => {
            return (
              <Marker
                lat={it.ubicacionPedido.lat}
                lng={it.ubicacionPedido.lng}
                color='#F4BE52'
              />
            )
          })
        }



      </GoogleMapReact>

    </div>
  )
}

export default MapView
