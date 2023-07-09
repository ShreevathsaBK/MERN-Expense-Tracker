import { Navbar, NavbarBrand } from 'reactstrap'

const AppNavBar = () => {
	return (
		<div className='appNavBar bg-white'>
			<Navbar className='shadow px-5'>
				<NavbarBrand href='/'>Expenses</NavbarBrand>
			</Navbar>
		</div>
	)
}

export default AppNavBar
