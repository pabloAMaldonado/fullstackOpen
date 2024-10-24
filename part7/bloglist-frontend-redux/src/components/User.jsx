
import { useDispatch } from 'react-redux'

import { setToken } from '../reducers/userReducer'
import useField from '../hook/useField'

const LoginForm = () => {
	const username = useField('username')
	const password = useField('password')
	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()
		const data  = {
			username: username.spread.value,
			password: password.spread.value
		}
		dispatch(setToken(data))
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						{...username.spread}
					/>
				</div>
				<div>
					password
					<input
						{...password.spread}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	)
}

export default LoginForm
