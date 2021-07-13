import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { DATA_map } from "../Database/DATA_map";
// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
// const geoUrl =
//  "./india.topo.json";
const geoUrl = require('./india.topo.json');

// const Data_map = [
//   { markerOffset: 15, name: "Baddi, HP",coordinates: [76.791359, 30.957827 ]},
//   { markerOffset: 15, name: "Bharuch, GJ", coordinates: [ 72.995872,21.705135] },
//   { markerOffset: 15, name: "Gujrat Ahmedabad", coordinates: [ 72.571365,23.022505] },
//   { markerOffset: 15, name: "AP, Nagaram	 ", coordinates: [ 81.907097,16.498846] },
//   { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   { markerOffset: 15, name: "Ankleshwar, GJ	 ", coordinates: [ 73.00302	,21.62485	] },
//   { markerOffset: 15, name: "Bhilai, Chattisgarh	 ", coordinates: [ 81.350945	,21.193848	] },
//   { markerOffset: 15, name: "Boisar, MH	  ", coordinates: [ 72.76673	,19.81068	] },
//   { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   // { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   // { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   // { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   // { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },
//   // { markerOffset: 15, name: "Maharashtra Navi Mumbai ", coordinates: [ 73.029663,19.033049] },

// ];
// console.log(DATA);
// const markers = JSON.parse(DATA) ;
const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937]
  };
  
const MapChart = () => {
  const {map_dataa} = DATA_map()
  return (
    <div>
      {map_dataa && <ComposableMap
    projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            // .filter(d => d.properties.REGION_UN === "Americas")
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {/* {markers.map(({ name, coordinates, markerOffset }) => ( */}
        {map_dataa.map(({ name, coordinates}) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={15} 
            style={{ fontFamily: "system-ui", fill: "#5D5A6D",fontSize:0.2+"em" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>}
    </div>
    
  );
};

export default MapChart;