
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const fetchDb = ({link}) => {
    const [db, setDb] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(link)
              setDb(response.data)
              setLoading(false)
            } catch (err) {
              setError(err)
              setLoading(false)
            }
          }
      
          fetchData()
    }, [])
    return { db, loading, error }
}

export default fetchDb
