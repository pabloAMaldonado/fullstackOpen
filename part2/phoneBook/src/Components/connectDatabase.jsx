
import axios from 'axios'

const useConnectDatabase = async ({method, link, data}) => {
    try {
        const config = {
            method: method.toLowerCase(),
            url: link,
            data: data,
            headers: {
                'content-type': 'application/json'
            }
        }

        const response = await axios(config)
        if (response.status === 201) {
            return response 
        }

        return ('Error on client side')
    } catch (error) {
        return error
    }
}

export default useConnectDatabase
