import React, { useEffect } from 'react'

const InputFilter = ({ input, setInput, setFilteredList, array }) => {
    const handleFilterChange = (event) => {
        const filter = event.target.value
        setInput(filter)

        const filtredList = array.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        )

        setFilteredList((filter === '') ? array : filtredList)
    }

    const handleBlur = () => {
        setInput('');
        setFilteredList(array);
    }

    useEffect(()=> {
        setFilteredList(array)
    }, [array])
    
    return (
        <>
            <h2>Search</h2>
            <input
                type="text"
                value={input}
                onChange={handleFilterChange}
                onBlur={handleBlur}
                placeholder="Filter by name"
            />
        </>
    )
}

export default InputFilter
