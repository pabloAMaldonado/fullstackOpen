import React, { useState, useEffect } from 'react'
import PhoneBookList from './Components/phoneBookList'
import PersonForm from './Components/personForm'
import InputFilter from './Components/inputFilter'
import FetchDb from './Components/fetchDb'

const baseUrl = 'api/persons'

const App = () => {
  const { db, loading, error, setDb } = FetchDb({ link: baseUrl })
  const [persons, setPersons] = useState(db)
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  useEffect(() => {
    if (db) {
        setPersons(db)
        setFilteredList(db)
    }
  }, [db])
  
  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm 
        elemento={newPerson}
        setElemento={setNewPerson}
        persons={persons}
        setPersons={setPersons}
        setDb={setDb}
      />

      <InputFilter  input={filter} setInput={setFilter} setFilteredList={setFilteredList} array={persons} />

      <PhoneBookList initialList={filteredList} setInitialList={setFilteredList} state={loading}  error={error} setDb={setDb} />
    </div>
  )
}

export default App