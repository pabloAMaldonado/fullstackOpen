
import UserView from '../UserView'
import NavigationMenu from '../NavigationMenu'
import { useSelector } from 'react-redux'

const UsersPage = () => {
	const user = useSelector(state => state.user)
	return (
		<div>
			<NavigationMenu />
			{user && ( <UserView />)}
		</div>

	)
}

export default UsersPage
