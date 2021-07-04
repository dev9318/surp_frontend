import React, {useState} from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
    const[value, setValue]= useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1)
    return (
        <span>
            Search:  {' '}
            <input value= {filter || ''} onChange = {(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}/>
        </span>
    )
}