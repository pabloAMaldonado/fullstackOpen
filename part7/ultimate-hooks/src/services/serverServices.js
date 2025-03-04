
import axios from 'axios'


const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (baseUrl, newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll, create }
