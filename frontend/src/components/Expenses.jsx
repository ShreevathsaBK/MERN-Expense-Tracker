import {
	ListGroupItem,
	ListGroup,
	ListGroupItemHeading,
	ListGroupItemText,
	ButtonGroup,
	Button,
	Row,
	Badge,
	Spinner,
} from 'reactstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useState, useEffect } from 'react'
import AddExpense from './AddExpense'
import { useExpenses } from '../hooks/useExpenses'

const pointer = {
	cursor: 'pointer',
}

const Expenses = () => {
	const [modal, setModal] = useState(false)
	const [edit, setEdit] = useState(false)
	const [editExpense, setEditExpense] = useState(false)
	const [showSpinner, setShowSpinner] = useState(false)
	const { expenses, dispatch } = useExpenses()

	const toggle = () => {
		setEdit(false)
		setModal(!modal)
	}

	const onEdit = (id) => {
		setEdit(true)
		setEditExpense(expenses.find((expense) => id === expense._id))
		setModal(!modal)
	}

	useEffect(() => {
		setShowSpinner(true)
		const fetchExpenses = async () => {
			const response = await fetch('/app/expenses')
			const json = await response.json()

			if (response.ok) {
				dispatch({ type: 'SET_EXPENSES', payload: json })
			}
			setShowSpinner(false)
		}

		fetchExpenses()
	}, [])

	const onDelete = async (id) => {
		const response = await fetch(`/app/expenses/${id}`, {
			method: 'DELETE',
		})

		const json = await response.json()

		if (response.ok) {
			dispatch({ type: 'DELETE_EXPENSE', payload: json })
		}
	}

	const renderListItem = (expense) => {
		return (
			<ListGroupItem key={expense._id}>
				<ListGroupItemHeading className='my-2 d-flex justify-content-between' tag={'div'}>
					<div className='expenseTitle text-success'>{expense.title}</div>
					<div className='listItemRightPanel'>
						<Badge color='success'>{expense.amount}</Badge>
						{<MdEdit style={pointer} onClick={() => onEdit(expense._id)} />}
						{
							<MdDelete
								style={pointer}
								onClick={() => onDelete(expense._id)}
								className='text-danger'
							/>
						}
					</div>
				</ListGroupItemHeading>
				<ListGroupItemText className='my-2 d-flex flex-row justify-content-between'>
					<span>{expense.description}</span>
					<Badge
						pill
						className='px-3 py-2 fst-italic text-dark border border-dark'
						color='light'>
						{expense.category}
					</Badge>
				</ListGroupItemText>
			</ListGroupItem>
		)
	}

	const renderExpenseList = () => {
		return showSpinner ? (
			<Spinner className='mt-5' color='primary' />
		) : (
			<ListGroup>{expenses && expenses.map((expense) => renderListItem(expense))}</ListGroup>
		)
	}

	const renderButtonGroup = (toggle) => {
		return (
			<>
				<ButtonGroup className='gap-3'>
					<Button className='bg-primary rounded'>Export </Button>
					<Button className='bg-primary rounded'>Import </Button>
					<Button onClick={toggle} className='bg-success rounded'>
						Add Expense
					</Button>
				</ButtonGroup>
			</>
		)
	}

	return (
		<>
			<Row className='expenseList justify-content-center overflow-auto'>
				{renderExpenseList(expenses)}
			</Row>
			<Row>{renderButtonGroup(toggle)}</Row>
			{modal && (
				<AddExpense
					modal={modal}
					editExpense={editExpense}
					isEdit={edit}
					onClose={toggle}></AddExpense>
			)}
		</>
	)
}

export default Expenses
