import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function Piechart(){
    var [data, setData] = useState([
                    {
                      "name": "Group A",
                      "value": 400
                    },
                    {
                      "name": "Group B",
                      "value": 300
                    },
                    {
                      "name": "Group C",
                      "value": 300
                    },
                    {
                      "name": "Group D",
                      "value": 200
                    },
                    {
                      "name": "Group E",
                      "value": 278
                    },
                    {
                      "name": "Group F",
                      "value": 189
                    }
                  ]);
    var [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const url = 'https://chemdbsurp.herokuapp.com/group?group=Type';

    // useEffect(() => {
    //     const abortCont = new AbortController();
    //     fetch(url, {signal: abortCont.signal})
    //     .then(res => {
    //         if (!res.ok) { // error coming back from server
    //         throw Error('could not fetch the data for that resource');
    //         } 
    //         return res.json();
    //     })
    //     .then(res => {
    //         setIsPending(false);
    //         setData([
    //             {
    //               "name": "Group A",
    //               "value": 400
    //             },
    //             {
    //               "name": "Group B",
    //               "value": 300
    //             },
    //             {
    //               "name": "Group C",
    //               "value": 300
    //             },
    //             {
    //               "name": "Group D",
    //               "value": 200
    //             },
    //             {
    //               "name": "Group E",
    //               "value": 278
    //             },
    //             {
    //               "name": "Group F",
    //               "value": 189
    //             }
    //           ]);
    //         console.log(data);
    //         setError('error');
    //     })
    //     .catch(err => {
    //         // auto catches network / connection error
    //     if (err.name === 'AbortError'){
    //         console.log("Fetch Aborted");
    //     }
    //     else{
    //         setIsPending(false);
    //         setError(err.message);
    //     }
    //     })
    //   }, [url]);

    return (
        <ResponsiveContainer width={700} height="80%">
                <PieChart width={300} height="40%">
                    <Pie data={data} dataKey="value" nameKey="name" />
                </PieChart>
            </ResponsiveContainer>
    );
                 
    
};

export default Piechart;