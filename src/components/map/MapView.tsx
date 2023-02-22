import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import mapsStyle from './mapsStyle.json';
import { typeMapView } from '../../types/typesMap';
import { SportsMmaSharp } from '@mui/icons-material';

const KEY_MAPS = ''




const Marker = ({ color, lat, lng }) => <div style={{ backgroundColor: color, width: '1.5rem', height: '1.5rem', borderRadius: '50%' }}> </div>

function MapView({ points }: typeMapView) {
  const defaultProps = {
    center: {
      lat: 20.6665706,
      lng: -103.3917025
    },
    zoom: 15
  };

  const apiIsLoaded= (map,maps,points) =>{
    let bounds=new maps.LatLngBounds();
    points.forEach(marker => {
      bounds.extend(marker.ubicacionPedido);
      
    });
    map.fitBounds(bounds)
  }
  

  return (
    <div style={{ height: '800px', width: '600px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY_MAPS }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ styles: mapsStyle }}
        onGoogleApiLoaded={({map,maps})=> apiIsLoaded(map,maps,points)}
      >
        {
          points.map((it) => {
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
