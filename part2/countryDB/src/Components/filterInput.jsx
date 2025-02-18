
import React, { useState, useEffect} from "react"



const FilterInput = ({ array, setFilteredList}) => {
    const [input, setInput] = useState('')

    const handleInputChange = (event) => {
        const filter = event.target.value
        setInput(filter)

        const filtredList = array.filter(item =>
            item.name.common.toLowerCase().includes(filter.toLowerCase())
        )
        
        setFilteredList((filter === '') ? array : filtredList)
    }

    useEffect(()=> {
        setFilteredList(array)
    }, [array])

    const handleBlur = () => {
        setInput('')
      }

    return (
        <>
        <h2>Find countries: </h2>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Filter by name"
            />
        </>
    )
}

export default FilterInput
