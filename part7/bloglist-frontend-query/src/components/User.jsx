
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserDispatch } from '../context/userContext'

import userService from '../services/userService'
import useField from '../hook/useField'
import { setNotificationWithTimeout, useNotiDispatch } from '../context/notiContext'

const LoginForm = () => {
	const dispatchUser = useUserDispatch()
	const dispatchNoti = useNotiDispatch()

	const username = useField('text')
	const password = useField('password')

	const loginMutation = useMutation({
		mutationFn: userService.postLogin,
		onSuccess: (data) => {
			dispatchUser({
				type: 'LOGIN',
				payload: data
			})
			setNotificationWithTimeout(dispatchNoti, `${data.name} loged successfully`, 5)
		},
		onError: () => {
			setNotificationWithTimeout(dispatchNoti, 'Error on credentials', 3)
		}
	})

	const handleLogin = async (event) => {
		event.preventDefault()
		const data = {
			username: username.spread.value,
			password: password.spread.value
		}

		loginMutation.mutate(data)
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
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
