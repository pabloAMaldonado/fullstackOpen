
import React, { useState } from 'react'
import axios from 'axios'
import useDeleteData from './deleteData'
import Notification from './notification'

const baseUrl = 'api/persons'

const handleDelete = async (id, setDb, array, setMessage, setStatus) => {
  const person = array.find(element => element._id === id)

  if (!window.confirm(`Are you sure you want to delete ${person.name} number ?`)) { return }

  try {
    const response = await  useDeleteData(id)

    if (response.status === 200) {
      
      const updatedDb = await fetchUpdatedDb()
      setDb(updatedDb)
      setMessage(response.message)
      setStatus(response.status)
      return response
    }

    setMessage(`${person.name} couldn't be deleted, refresh the page and try again please.`)
    setStatus(404)
    return response
  }catch (error){
    setMessage(`Information on ${person.name} was already deleted.`)
    setStatus(404)
    return error
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

const PhoneBookList = ({ initialList, state, error, setDb }) => {
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  if (state || !initialList) {
    return <p>Loading...</p>
  }

  if (initialList.length === 0) {
    return <p>No info...</p>
  }


  if (error) {
      return <p>Error: {error.message}</p>
  }

      return (
        <>
          <h2>List</h2>
            
          {initialList.map((item, index) => (
            <p key={index}>
              {item.name} - {item.number}
              <button onClick={() => handleDelete(item._id, setDb, initialList, setMessage, setStatus)}>
                Delete
              </button>
              
            </p>
          ))}
          <Notification message={message} status={status} />
        </>
      )
  
}
  
export default PhoneBookList
