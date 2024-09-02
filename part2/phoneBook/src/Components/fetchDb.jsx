import { useState, useEffect } from 'react'
import  axios from 'axios'

const baseUrl = 'api/persons'

const FetchDb = ({ link }) => {
  const [db, setDb] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(baseUrl)
              setDb(response.data)
              setLoading(false)
          } catch (err) {
              setError(err)
              setLoading(false)
          }
      }

      fetchData()
  }, [link])

  return { db, loading, error, setDb }
}

export default FetchDb