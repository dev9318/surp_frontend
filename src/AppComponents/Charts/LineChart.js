import React, { PureComponent } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Brush, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';
import moment from 'moment';


export const Linechart = () =>{
    var [data, setData] = useState([]);
    var [activeIndex, setActiveIndex] = useState(0);
    var [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [col, setCol] = useState('Date');
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
            res.data.sort((a,b)=>{
              return new Date(a._id) - new Date(b._id);
            })
            var d = [];
            for(var r in res.data){
              d[r] = {'_id': moment(res.data[r]._id).local().format("DD-MM-YYYY"), 'count':res.data[r].count}
            }
            setData(d);
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
        </div>
         <div className="row">
           <ResponsiveContainer width={1200} height={900}>
           <LineChart width={600} height={300} data={data} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="_id"/>
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Brush dataKey="date" startIndex={0}>
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey="count" stroke="#8884d8" fill="#8884d8" dot={false} />
              </AreaChart>
            </Brush>
          </LineChart>
           </ResponsiveContainer>
         
         </div>   
       
      </div>  
       
            
    );
}