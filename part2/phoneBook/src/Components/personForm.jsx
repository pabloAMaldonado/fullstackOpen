import React, { useState } from 'react'
import axios from 'axios'
import useConnectDatabase from './connectDatabase'
import useUpdateNumber from './updateNumber'
import Notification from './notification'

const baseUrl = 'api/persons'

const handleInputChange = ({ elemento, setElemento }) => (event) => {
    const { name, value } = event.target
    setElemento({
      ...elemento,
      [name]: value
    })
}

const updateHandler = async (array, name, newNumber, setDb, setMessage, setStatus) => {
  try {
    const response = await useUpdateNumber(array, name, newNumber, setDb)

    if (response.status === 200) {
      setMessage(`${name} has been successfully updated`)
      setStatus(201)
      return response 
    }
    setMessage(`${name} couldn't update, refresh the page and try again please.`)
    setStatus(404)
    return response
  }catch (error) {
    setMessage(`Error on the connection`)
    setStatus(404)
    return error
  }
  
}

const handleSubmit = ({ elemento, setElemento, persons, setPersons, setDb, setMessage, setStatus }) => async (event) => {
    event.preventDefault()

    if (elemento.name === '') return alert('Debes ingresar un nombre')
    if (elemento.number === '') return alert('Debes ingresar un número')
    if (persons.some(person => person.name === elemento.name)) {
      const update = await updateHandler(persons, elemento.name, elemento.number, setDb, setMessage, setStatus)
      return
    }

    const url = baseUrl
    const newPerson = {
      name: elemento.name,
      number: elemento.number
    }
    try {
      const response =  await useConnectDatabase({
        method: 'post',
        link: url,
        data: newPerson
      })

        if (response.status === 201) {
          const updatedDb = await fetchUpdatedDb()

          setDb(updatedDb)
          setMessage(`${elemento.name} has been successfully added`)
          setStatus(201)

          setElemento({
            name: '',
            number: '',
          })
        } else if (response.response.status === 400) {
          const updatedDb = await fetchUpdatedDb()

          setDb(updatedDb)
          setMessage(response.response.data.error)
          setStatus(400)
        }

      }
      catch (error) {
        setMessage(`Failed to add ${elemento.name}`)
        setStatus(500)
      }
}

const fetchUpdatedDb = async () => {
  try {
    const response = await axios.get(baseUrl)
  const { data } = response
  return data
  } catch (error) {
    console.error('Error sending request', error)
  }
}

const PersonForm = ({ elemento, setElemento, persons, setPersons, setDb }) => {
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  
  return (
    <form onSubmit={handleSubmit({ elemento, setElemento, persons, setPersons, setDb, setMessage, setStatus })}>
        <div>
          name: 
          <input
            type="text"
            name='name'
            value={elemento.name}
            onChange={handleInputChange({ elemento, setElemento })}
          />
          <br />
          number: 
          <input
            type="text"
            name='number'
            value={elemento.number}
            onChange={handleInputChange({ elemento, setElemento })}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
        <Notification message={message} status={status} />
    </form>
  )
}


export default PersonForm