import {
	Nav,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import { MONTHS } from '../util/constants'
import '../style/graph.css'
import { useState } from 'react'

const Graphs = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [activeMonth, setActiveMonth] = useState(MONTHS[0])

	const handleMonthClick = (monthIdx) => {
		setActiveMonth(MONTHS[monthIdx])
	}

	const toggle = () => setDropdownOpen((prevState) => !prevState)

	const renderNav = () => {
		return (
			<Nav tabs className='gap-1'>
				<NavItem>
					<Dropdown isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle className='py-1' color='primary' caret>
							Year
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>2023</DropdownItem>
							<DropdownItem>2024</DropdownItem>
							<DropdownItem>2025</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavItem>
				{MONTHS.map((month, monthIdx) => (
					<NavItem>
						<NavLink
							className={`rounded pointer py-1 ${
								activeMonth === month ? 'bg-primary text-light' : ''
							}`}
							onClick={() => handleMonthClick(monthIdx)}>
							{month}
						</NavLink>
					</NavItem>
				))}
			</Nav>
		)
	}

	return renderNav()
}

export default Graphs
