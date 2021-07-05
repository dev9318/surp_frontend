import React from 'react';   
import BasicTable from './AppComponents/Database/BasicTable'; 
import Navbar from './AppComponents/Navbar/Navbar';
import Home from './AppComponents/Home/home';
import Contact from './AppComponents/Contact/contact.js';
import Form from './AppComponents/SignUp/Form.js'
import './App.css';
import {Route,Link } from "react-router-dom";
import Piechart from './AppComponents/Charts/PieChart';

function App(){
	return (  
        <div classname= 'App'>
            <Navbar />
            <Route exact path ="/home" component ={Home} />
            <Route exact path = "/database" component ={BasicTable} />
            <Route exact path = "/contact" component ={Contact} />
            <Route exact path = "/signup" component ={Form} />
            <Route path = "/pie" component ={Piechart} />
            
            {/* <Route exact path = "/map" component {Map} /> */}

            {/* <Contact/> */}
            
        	{/* <BasicTable />       */}
            
        </div>        
    )  




}


export default App;
