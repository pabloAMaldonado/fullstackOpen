
import Notification from './Notification'
import LoginForm from './User'
import { Link, useNavigate } from 'react-router-dom'

import { useUserDispatch, useUserValue } from '../context/userContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../services/userService'


const NavigationMenu = () => {
	const navigate = useNavigate()
	const user = useUserValue()

	const dispatchUser = useUserDispatch()
	const queryClient = useQueryClient()

	const logoutMutation = useMutation({
		mutationFn: userService.postLogout,
		onSuccess: () => {
			queryClient.invalidateQueries('user')
			dispatchUser({
				type: 'LOGOUT'
			})
			navigate('/')
		}
	})

	const handleLogout = (event) => {
		event.preventDefault()
		logoutMutation.mutate()
	}


	const barStyle = {
		margin: '0px 15px',
		display: 'flex',
		flexDirection: 'row',
		justifySelf: 'center',
		alignItems: 'center',
	}

	const style = {
		backgroundColor: '#A2E9E7'
	}

	const styleChildren = {
		margin: '10px',
		padding: '0px 10px'
	}

	const styleTitle = {
		width: '10%',
		margin: '0 auto'
	}

	return (
		<div >
			<div style={style}>
				<div style={barStyle}>
					<Link style={styleChildren} to='/'>Blogs</Link>
					<Link style={styleChildren} to='/users'>Users</Link>
					{ user && (<p style={styleChildren} >{user.name} logged in.</p>) }
					{ user && (<button onClick={handleLogout} style={styleChildren} >Logout</button>) }
				</div>
			</div>
			<br />
			<Notification />
			<br />
			<h2 style={styleTitle}>Blog app</h2>
			<br />
			{!user && (
				<LoginForm />
			)}
			<br />
		</div>

	)
}

export default NavigationMenu
