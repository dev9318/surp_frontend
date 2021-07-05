import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function Piechart(){
    var [data, setData] = useState([]);
    var [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [col, setCol] = useState('Type');
    const columns = ['Type', 'Date', 'Company']

    useEffect(() => {
        const url = `https://chemdbsurp.herokuapp.com/group?group=${col}`;
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(res => {
            setIsPending(false);
            setData(res.data);
            setError('error');
        })
        .catch(err => {
            // auto catches network / connection error
        if (err.name === 'AbortError'){
            console.log("Fetch Aborted");
        }
        else{
            setIsPending(false);
            setError(err.message);
        }
        })
      }, [col]);


    return (
        <div>
          <button onClick={()=> setOpen(open=>!open)}> {col} </button>
          {open && <div className="shadow h-auto w-56">
          <ul className="text-left">
            {columns.map((item, i) => (
                <li key={i} style={{"background":"#ff9999","margin": "1px", "padding": "5px","position": "flex"}} onClick={() => {
                  setOpen(false);
                  setCol(item);
                }}>
                  {item}
                </li>
              ))}
          </ul>
        </div>}
         <center> 
          <PieChart width={700} height={700}>
            <Pie data={data} dataKey="count" nameKey="_id" label="_id"/>
          </PieChart>
        </center>
      </div>  
       
            
    );
                 
    
};

export default Piechart;