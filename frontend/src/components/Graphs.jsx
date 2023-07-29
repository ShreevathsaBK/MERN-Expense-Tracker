import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'

import {
	Nav,
	NavItem,
	NavLink,
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'

import { Bar, Doughnut } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js'

import {
	MONTHS,
	NO_OF_YEARS,
	PIE_CHART,
	PIE_COLORS,
	LINE_CHART,
	CATEGORIES,
} from '../util/constants'
import { calculateDayTotals, calculateCategoryTotals } from '../util/graphUtils'
import { getCurrMonth, getCurrYear, daysInMonth } from '../util/dateTimeUtil'
import '../style/graph.css'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
)

const Graphs = () => {
	const { expenses } = useExpenses()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [activeMonth, setActiveMonth] = useState(getCurrMonth())
	const [activeYear, setActiveYear] = useState(getCurrYear())
	const [chart, setChart] = useState('Pie Chart')

	const toggle = () => setDropdownOpen((prevState) => !prevState)

	const handleMonthClick = (monthIdx) => {
		setActiveMonth(monthIdx)
	}

	const renderBarChart = () => {
		const currYear = getCurrYear()
		const days = [...Array(daysInMonth(currYear, activeMonth)).keys()].slice(1)
		const options = {
			responsive: true,
			plugins: { legend: { display: false } },
			scales: {
				y: {
					suggestedMax: 5000,
					grace: 10,
				},
			},
		}

		const data = {
			labels: days,
			datasets: [
				{
					data: days.map((day) =>
						calculateDayTotals(expenses, day, activeMonth, activeYear)
					),
					backgroundColor: '#347474',
					tension: 0.5,
				},
			],
		}

		return <Bar options={options} data={data} />
	}

	const renderPieChart = () => {
		const options = {
			plugins: { legend: { display: true, position: 'left' } },
			maintainAspectRatio: false,
		}

		const data = {
			labels: CATEGORIES,
			datasets: [
				{
					data: CATEGORIES.map((category) =>
						calculateCategoryTotals(expenses, category, activeMonth, activeYear)
					),
					backgroundColor: PIE_COLORS,
				},
			],
		}

		return (
			<div style={{ height: '70%', width: '80%', margin: 'auto' }}>
				<Doughnut data={data} options={options} />
			</div>
		)
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

	const renderViewSwtich = () => {
		const toggleChart = () => {
			chart === PIE_CHART ? setChart(LINE_CHART) : setChart(PIE_CHART)
		}

		return (
			<Button onClick={() => toggleChart()} color='success' style={{ width: '15%' }}>
				{chart}
			</Button>
		)
	}

	return (
		<>
			{renderNav()}
			{chart === PIE_CHART ? renderBarChart() : renderPieChart()}
			{renderViewSwtich()}
		</>
	)
}

export default Graphs
