
import UserView from '../UserView'
import NavigationMenu from '../NavigationMenu'
import { useUserValue } from '../../context/userContext'

const UsersPage = () => {
	const user = useUserValue()
	return (
		<div>
			<NavigationMenu />
			{user && ( <UserView />)}
		</div>

	)
}

export default UsersPage
