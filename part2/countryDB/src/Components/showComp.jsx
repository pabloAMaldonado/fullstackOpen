
import React from 'react'

const ShowComp = ({ name, array, setFilteredList }) => {
    const show = () => {
        const filtered = array.filter(item => 
            item.name.common.toLowerCase().includes(name.toLowerCase())
            )

        setFilteredList(filtered)
    }
    
    return (
        <button onClick={show}>
            Show
        </button>
    )
}

export default ShowComp
