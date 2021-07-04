import React from 'react';


const PieChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = useState(null);
    const url = 'https://chemdbsurp.herokuapp.com/group?group=Type';

    useEffect(() => {
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
            setError(null);
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
      }, []);

    return (
        <div> 
            {data && <ResponsiveContainer width={700} height="80%">
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                </PieChart>
            </ResponsiveContainer>}
        </div>
        
    );
};

export default PieChart;