import React, { PureComponent } from 'react';
import { LineChart, Line, ResponsiveContainer, Sector } from 'recharts';
import { useState, useEffect } from 'react';


export const Linechart = () =>{
    var [data, setData] = useState([]);
    var [activeIndex, setActiveIndex] = useState(0);
    var [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    // const [col, setCol] = useState('Type');
    const columns = ['Type', 'Date', 'Company'];
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);

    const onPieEnter = (_, index)=> {
        setActiveIndex(index);
    }
    useEffect(() => {
        let opts=`?group=${col}`;
        if(date1){
          opts = opts + '&startDate=' + date1;
        }
        if(date2){
          opts = opts + '&endDate=' + date2;
        }
        console.log(opts);
        const url = `https://chemdbsurp.herokuapp.com/group`+opts;
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
      }, [col, date1, date2]);

    return (
        <div>
          
          <div className="row">
            <div className="column">
            
              <label for="start">Start date:</label>

              <input type="date" id="start"
                    value={date1} onChange={date=>{
                      setDate1(date.target.value)
                    }}></input>
            </div>
            <div className="column">
            <label for="end">End date:</label>

            <input type="date" id="end"
                  value={date2} onChange={date=>setDate2(date.target.value)}></input>
            </div>
        <div className="column">
        <div class="dropdown">
            <button class="dropbtn">{col}</button>
            <div class="dropdown-content">
              <a onClick={()=>{setCol("Type");}}>Type</a>
              <a onClick={()=>{setCol("Date");}}>Date</a>
              <a onClick={()=>{setCol("Company");}}>Company</a>
            </div>
          </div>
        </div>
        </div>
         <div className="row">
           <ResponsiveContainer width={1200} height={900}>
           
           </ResponsiveContainer>
         
         </div>   
       
      </div>  
       
            
    );
}