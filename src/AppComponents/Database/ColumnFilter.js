import React from 'react'

export const ColumnFilter = ({ column }) => {
    const {filterValue, setFilter} = column
    return (
        <span>
            
            {' '}
            <input style= {{
                width: "100%"
                }} 
                value= {filterValue || ''} onChange = {(e) => setFilter(e.target.value)}/>
        </span>
    )
}