import React from 'react';


 export class DATA extends React.Component {


 async componentDidMount(){

 	const url = "https://chemdbsurp.herokuapp.com/";

 	const response = await fetch(url);
 	const data = await response.json();

 	return data;
}
}
