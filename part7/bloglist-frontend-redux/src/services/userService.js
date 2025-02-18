import axios from 'axios'
const baseUrl = '/api/users/login'

const postLogin = async (credentials) => {
	const res = await axios.post(baseUrl, credentials)
	return res.data
}

const postLogout = () => {
	window.localStorage.removeItem('user')
}

export default { postLogin, postLogout }
