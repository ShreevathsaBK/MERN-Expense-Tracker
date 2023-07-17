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
import ExpenseModal from './ExpenseModal'
import ImportModal from './ImportModal'
import { useExpenses } from '../hooks/useExpenses'
import { useAuth } from '../hooks/useAuth'

const pointer = {
	cursor: 'pointer',
}

const Expenses = () => {
	const { expenses, dispatch } = useExpenses()
	const { user } = useAuth()

	const [expenseModal, setExpenseModal] = useState(false)
	const [importModal, setImportModal] = useState(false)
	const [edit, setEdit] = useState(false)
	const [editExpense, setEditExpense] = useState(false)
	const [showSpinner, setShowSpinner] = useState(false)

	const toggleExpenseModal = () => {
		setEdit(false)
		setExpenseModal(!expenseModal)
	}

	const toggleImportModal = () => {
		setImportModal(!importModal)
	}

	const onEdit = (id) => {
		setEdit(true)
		setEditExpense(expenses.find((expense) => id === expense._id))
		setExpenseModal(!expenseModal)
	}

	useEffect(() => {
		setShowSpinner(true)
		const fetchExpenses = async () => {
			const response = await fetch('/app/expenses', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			})
			const json = await response.json()

			if (response.ok) {
				dispatch({ type: 'SET_EXPENSES', payload: json })
			}
			setShowSpinner(false)
		}

		if (user) fetchExpenses()
	}, [dispatch, user])

	const onDelete = async (id) => {
		if (!user) return
		const response = await fetch(`/app/expenses/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		})

		const json = await response.json()

		if (response.ok) {
			dispatch({ type: 'DELETE_EXPENSE', payload: json })
		}
	}

	const renderListItem = (expense) => {
		return (
			<ListGroupItem className='bg-light border rounded m-2' key={expense._id}>
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

	const renderZeroState = () => {
		return (
			<ListGroup>
				<ListGroupItem className='p-4 m-4 bg-light border border-primary'>
					<h3>You do not have any expenses</h3>
					<p>
						Get started by clicking <Badge color='success'>Add Expense</Badge> or{' '}
						<Badge color='primary'>Import</Badge> them from a csv !!
					</p>
				</ListGroupItem>
			</ListGroup>
		)
	}

	const renderExpenseList = () => {
		if (showSpinner) {
			return <Spinner className='mt-5' color='primary' />
		}

		if (expenses.length === 0) {
			return renderZeroState()
		}

		return <ListGroup>{expenses.map((expense) => renderListItem(expense))}</ListGroup>
	}

	const renderButtonGroup = (toggle) => {
		return (
			<>
				<ButtonGroup className='gap-3'>
					<Button className='bg-primary rounded'>Export </Button>
					<Button onClick={toggleImportModal} className='bg-primary rounded'>
						Import{' '}
					</Button>
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
			<Row>{renderButtonGroup(toggleExpenseModal)}</Row>
			{expenseModal && (
				<ExpenseModal
					expenseModal={expenseModal}
					editExpense={editExpense}
					isEdit={edit}
					onClose={toggleExpenseModal}></ExpenseModal>
			)}
			{importModal && (
				<ImportModal importModal={ImportModal} onClose={toggleImportModal}></ImportModal>
			)}
		</>
	)
}

export default Expenses
