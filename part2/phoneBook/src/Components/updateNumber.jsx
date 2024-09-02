
import React from 'react'
import axios from 'axios'

const baseUrl = 'api/persons'

const fetchUpdatedDb = async () => {
    const response = await axios.get(baseUrl)

    return response.data
  }

const useUpdateNumber = async (array, name, newNumber, setDb) => {
    const personUpdate = array.find(element => element.name === name)

    if (!window.confirm('Are you sure you want to update the number?')) return

    const response = await axios.put(
        baseUrl+`/${personUpdate._id}`, {
            name: personUpdate.name,
            number: newNumber
        }
        )

    if (response.status === 200) {
        const updatedDb = await fetchUpdatedDb()
        setDb(updatedDb)
    }

    return response
}

export default useUpdateNumber
