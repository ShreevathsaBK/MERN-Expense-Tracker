import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'

import {
	Nav,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'

import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

import { MONTHS, NO_OF_YEARS } from '../util/constants'
import { calculateDayTotals } from '../util/graphUtils'
import { getCurrMonth, getCurrYear, daysInMonth } from '../util/dateTimeUtil'
import '../style/graph.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Graphs = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [activeMonth, setActiveMonth] = useState(getCurrMonth())
	const [activeYear, setActiveYear] = useState(getCurrYear())

	const toggle = () => setDropdownOpen((prevState) => !prevState)

	const handleMonthClick = (monthIdx) => {
		setActiveMonth(monthIdx)
	}

	const renderLineChart = () => {
		const { expenses } = useExpenses()
		const currYear = getCurrYear()
		const days = [...Array(daysInMonth(currYear, activeMonth)).keys()].slice(1)
		const options = {
			responsive: true,
			plugins: { legend: { display: false } },
		}

		const data = {
			labels: days,
			datasets: [
				{
					data: days.map((day) =>
						calculateDayTotals(expenses, day, activeMonth, activeYear)
					),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			],
		}

		return <Line options={options} data={data} />
	}

	const renderDropdown = () => {
		const years = Array.from({ length: NO_OF_YEARS }, (_, i) => getCurrYear() - 2 + i)

		return (
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className='py-1' color='primary' caret>
					{activeYear}
				</DropdownToggle>
				<DropdownMenu>
					{years.map((year) => (
						<DropdownItem onClick={() => setActiveYear(year)}>{year}</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		)
	}

	const renderMonths = () => {
		return MONTHS.map((month, monthIdx) => (
			<NavItem>
				<NavLink
					className={`rounded pointer py-1 ${
						activeMonth === monthIdx ? 'bg-primary text-light' : ''
					}`}
					onClick={() => handleMonthClick(monthIdx)}>
					{month}
				</NavLink>
			</NavItem>
		))
	}

	const renderNav = () => {
		return (
			<Nav tabs className='gap-1'>
				<NavItem>{renderDropdown()}</NavItem>
				{renderMonths()}
			</Nav>
		)
	}

	return (
		<>
			{renderNav()}
			{renderLineChart()}
		</>
	)
}

export default Graphs
