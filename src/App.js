import React from 'react';
import BasicTable from './AppComponents/Database/BasicTable';
import Navbar from './AppComponents/Navbar/Navbar';
import Home from './AppComponents/Home/home';
import Contact from './AppComponents/Contact/contact.js';
import Form from './AppComponents/SignUp/Form.js'
import './App.css';
import { Route, Link } from "react-router-dom";
import Piechart from './AppComponents/Charts/PieChart';
import AddInfo from "./AppComponents/InfoByUser/AddInfo";
import Lists from "./AppComponents/InfoByUser/Lists";
import { MapChart } from './AppComponents/Map/MapChar';
import { Linechart } from './AppComponents/Charts/LineChart';

function App() {
    return (
        <div classname='App'>
            <Navbar />
            <Route exact path="/home" component={Home} />
            <Route exact path="/database" component={BasicTable} />
            {/* <Route exact path="/" component={BasicTable} /> */}
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/signup" component={Form} />
            <Route path="/pie" component={Piechart} />
            <Route path="/addInfo" component={AddInfo} />
            <Route path="/list" component={Lists} />
            <Route path="/line" component={Linechart} />
            <Route path = "/map" component={MapChart} />

            {/* <Contact/> */}

            {/* <BasicTable />       */}

        </div>
    )




}


export default App;
