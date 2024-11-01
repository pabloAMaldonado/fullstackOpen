/* eslint-disable react/no-unknown-property */

import { useDispatch } from 'react-redux'
import useField from '../hook/useField'
import { TextField } from '@mui/material'

import { setToken } from '../reducers/userReducer'

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

	const styleInput = {
		margin: '10px'
	}

	const styleButton = {
		margin: '25px'
	}

	const styleLogin = {
		margin: '35px'
	}

	const styleLoginDiv = {
		display: 'grid',
  		placeItems: 'center',
		width: '50%',
		margin: '0 auto',
		backgroundColor: '#A2E9E7',
		borderRadius: '15px'
	}

	const styleLoginForm = {
		margin: 'auto'
	}
	return (
		<div style={styleLoginDiv}>
			<h1 style={styleLogin} >Login</h1>
			<form style={styleLoginForm} onSubmit={handleLogin}>
				<div style={styleInput}>
					<TextField label="username" {...username.spread}/>
				</div>
				<div style={styleInput}>
					<TextField label="password" {...password.spread} />
				</div>
				<button variant="contained" color="primary" type='submit' style={styleButton}>login</button>
			</form>
		</div>
	)
}

export default LoginForm
