
import React, { useEffect, useState } from 'react'

import fetchDb from './Components/fetchDb'
import CountryList from './Components/countryList'

function App() {
  const { db, loading, error } = fetchDb({ link: 'https://studies.cs.helsinki.fi/restcountries/api/all' })
  const [list, setList] = useState([db])

  useEffect(() => {
    setList(db)
  }, [db])

  return(
    <CountryList db={list} state={loading} error={error}/>
  )
}

export default App
