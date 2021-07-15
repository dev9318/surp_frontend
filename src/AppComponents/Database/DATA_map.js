import React from 'react';



export const DATA_map = () => {
    
 	const url = "https://chemdbsurp.herokuapp.com/";
   
    const [map_dataa, setData] = React.useState([]);
 	fetch(url)
    .then(res => {
        if (!res.ok) {
        throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
          console.log(data)
        var map_data = [];
        for(var row in data.data){
           map_data[map_data.length] = { markerOffset: 15, name: row.Location,coordinate:[row.Longitude,row.Latitude ]};
        }
        
        setData(map_data);

      })
      .catch(err => {
        // auto catches network / connection error
      if (err.name === 'AbortError'){
        console.log("Fetch Aborted");
      }
    //   else{
    //     setError(err.message);
    //     setLoading(false)
    //   }
      })
	
 	return map_dataa;
    
}

//  export class DATA_map extends React.Component {


//  async componentDidMount(){

//  	const url = "https://chemdbsurp.herokuapp.com/";

//  	const response = await fetch(url);
//  	const data = await response.json();
// 	 var map_data = [];
// 	 for(var row in data){
// 		map_data[map_data.length] = { markerOffset: 15, name: row.Location,coordinate:[row.Longitude,row.Latitude ]};
// 	 }
	 
//  	return map_data;
// }
// }
