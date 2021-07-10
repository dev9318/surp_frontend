import React, { PureComponent } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';
import { useState, useEffect } from 'react';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  console.log(payload);

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload._id}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Piechart() {
    var [data, setData] = useState([]);
    var [activeIndex, setActiveIndex] = useState(0);
    var [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [col, setCol] = useState('Type');
    const columns = ['Type', 'Date', 'Company']

    const onPieEnter = (_, index)=> {
        setActiveIndex(index);
    }
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
          <center><button onClick={()=> setOpen(open=>!open)}style={{
              position: "relative",
              margin: "16px",
              width: "auto"
            }}> {col} </button>
          {open && <div className="shadow h-auto w-56" style={{
              position: "relative"
            }}>
          <ul className="text-left">
            {columns.map((item, i) => (
                <li key={i} style={{"background":"#eeeeee", "padding": "5px","width":"100px"}} onClick={() => {
                  setOpen(false);
                  setCol(item);
                }}>
                  {item}
                </li>
              ))}
          </ul>
        </div>}</center>
         <center> 
          <PieChart width={1000} height={700}>

            <Pie
             data={data} 
             dataKey="count" 
             nameKey="_id" 
             label
             activeIndex={activeIndex}
             activeShape={renderActiveShape}
             cx="50%"
             cy="50%"
             innerRadius={210}
             outerRadius={300}
             fill="#8884d8"
             onMouseEnter={onPieEnter}
             />
          </PieChart>
        </center>
      </div>  
       
            
    );
                 
    
};