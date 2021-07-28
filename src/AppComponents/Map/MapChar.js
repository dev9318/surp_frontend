import { green, lightGreen, red } from "@material-ui/core/colors";
import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

import './Map.css';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
const geoUrl = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937]
};

export const MapChart = () => {
  const url = "https://chemdbsurp.herokuapp.com/?limit=50";

  const [map_dataa, setData] = React.useState([]);

  const [isPending, setIsPending] = React.useState(true);

  const [menu, setOver] = React.useState('All');


  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        console.log(data)
        var map_data = [];
        for (var row in data.data) {
          console.log(row);
          map_data[map_data.length] = { ID : data.data[row]._id, Type: data.data[row].Type, markerOffset: 15, name: data.data[row].Location, coordinates: [parseFloat(data.data[row].Longitude), parseFloat(data.data[row].Latitude)], show: false };
        }

        setData(map_data);

      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        if (err.name === 'AbortError') {
          console.log("Fetch Aborted");
        }
        //   else{
        //     setError(err.message);
        //     setLoading(false)
        //   }
      })
  }, []);
  // console.log(map_dataa);
  var map_d = []
  if (menu !== 'All') {
    map_d = map_dataa.filter((row) => row.Type === menu);


  }
  else {
    map_d = map_dataa;
  }
 
  console.log(map_d);
  var count = [];

  for (var row in map_d) {
    if (!(map_d[row].coordinates in count)) {
      count[map_d[row].coordinates] = 1

    }
    else {
      count[map_d[row].coordinates] += 1;

    }

  }
  console.log(count);

    return (
      <div class="container">
        {!isPending && <div class="dropdown">
          <center><button class="dropbtn">Type of Accident</button>
          <div class="dropdown-content">
            <a onClick={() => setOver('All')}>All</a>
            <a onClick={() => setOver('Explosion')}>Explosion</a>
            <a onClick={() => setOver('Fire')}> Fire </a>
            <a onClick={() => setOver('Reactor explosion')}> Reactor Explosion </a>
            <a onClick={() => setOver('Crane collapse')}> Crane collapse </a>
            <a onClick={() => setOver('Benzimidazole gas leakage')}> Benzimidazole gas leakage</a>
          </div>
          </center>
        </div>}
        {isPending && <h2 style={{
  
          position: 'absolute',
          top: 280, left: 700,
          right: 0, bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }} >Loading...</h2>}
        {map_d && <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
          data-tip=""
  
        >
          {!isPending && <Geographies geography={geoUrl}>
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
          </Geographies>}
          {/* {markers.map(({ name, coordinates, markerOffset }) => ( */}
  
          
            
              {map_d.map(({ID, name, coordinates, show }) => (
               
                <Marker key={ID} coordinates={coordinates}  onMouseEnter={() => show=true} >
                 
                 {console.log(show)}
                  {count[coordinates] === 1 && < circle r={3} fill="green" stroke="#fff" strokeWidth={2} />}
                  {count[coordinates] === 2 && < circle r={3} fill="blue" stroke="#fff" strokeWidth={2} />}
                  {count[coordinates] > 2 && <circle r={3} fill="red" stroke="#fff" strokeWidth={2} />}
  
  
  
  
                  {<text
                    textAnchor="middle"
                    y={15}
                    style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 0.2 + "em" }}
                  >
                    {name}
                  </text>
                  }
                </Marker>
              )
              )
            
         
                }
  
        </ComposableMap>
        }
  
  
      </div>
  
    );

};

