
import axios from 'axios'

const baseUrl = 'api/persons/'

const useDeleteData = async (id) => {
    try {
        const response = await axios.delete(baseUrl+id)

        if (response.status === 200) {
            return response
        }else {
            return console.error('Error client side')
        }
    } catch (error) {
        console.error('Error sending request', error)
    }
}

export default useDeleteData
