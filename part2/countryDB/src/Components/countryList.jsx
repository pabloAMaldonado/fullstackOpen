
import React, { useState, useEffect} from "react"
import FilterInput from "./filterInput"
import ShowComp from "./showComp"

const CountryList = ({ db, state, error}) => {
    const [list, setList] = useState([])
    const [filteredList, setFilteredList] = useState(list)

    useEffect(() => {
        setList(db)
      }, [db])
          
    if (state) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    if (filteredList.length > 10) {
        return (
            <>
                <FilterInput array={list} setFilteredList={setFilteredList} />
                <p>Too many matches, please specify more.</p>
            </>
        )
    }

    if (filteredList.length === 1) {
        const country = filteredList[0]
        const leng = country.languages
        return (
            <div>
                <h2>{country.name.official}</h2>
                <p>Capital: {country.capital}</p>
                <p>Popultaion: {country.population} persons</p>
                <p>Lenguages:</p>
                <ul>
                    {Object.values(leng).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        )
    }

    return (
        <>
            <FilterInput array={list} setFilteredList={setFilteredList} />
            {filteredList.map((item, index) => (
                <>
                <p key={index}>{item.name.common}</p> <ShowComp name={item.name.common} array={filteredList} setFilteredList={setFilteredList} />
                </>
            ))}
        </>
    )
}

export default CountryList
