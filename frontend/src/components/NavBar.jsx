import { Nav, NavLink, NavItem, Button } from 'reactstrap'
import { useLogout } from '../hooks/useLogout'
import { useAuth } from '../hooks/useAuth'

const AppNavBar = () => {
	const { logout } = useLogout()
	const { user } = useAuth()

	return (
		<div className='appNavBar'>
			<Nav className='py-2 px-4 shadow-sm bg-white justify-content-between'>
				<NavItem>
					<NavLink style={{ fontSize: '25px' }} href='/'>
						<strong>Expenses</strong>
					</NavLink>
				</NavItem>
				{!user && (
					<div className='d-flex'>
						<NavItem>
							<NavLink href='/login'>Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/signup'>Signup</NavLink>
						</NavItem>
					</div>
				)}

				{user && (
					<div className='d-flex gap-2 mx-2 align-items-center'>
						<NavItem className='my-auto'>{user.email}</NavItem>
						<NavItem>
							<Button onClick={logout}>Logout</Button>
						</NavItem>
					</div>
				)}
			</Nav>
		</div>
	)
}

export default AppNavBar
