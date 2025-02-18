
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import LoginForm from './User'
import { Link, useNavigate } from 'react-router-dom'

import { logoutToken } from '../reducers/userReducer'

const NavigationMenu = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const handleLogout = (event) => {
		dispatch(logoutToken(event))
		navigate('/')
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
				<div style={barStyle} >
					<Link style={styleChildren} to='/'>Blogs</Link>
					<Link style={styleChildren} to='/users'>Users</Link>
					{ user && (<p style={styleChildren} >{user.name} logged in.</p>) }
					{user && (<button onClick={(event) =>  handleLogout(event)} style={styleChildren} >Logout</button>)}
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
