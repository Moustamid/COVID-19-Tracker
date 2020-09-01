import React from 'react' ;
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import './map.css';
import {showDataOnMap} from '../../Helper/util';

function Map( { countries, casesType, center, zoom} ) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} >
         <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Loop throught all the countries and draw the circles */}
           {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map;
 