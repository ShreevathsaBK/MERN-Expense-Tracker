import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Alert,
} from 'reactstrap'
import { useState, useEffect } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { getDate, getTime } from '../util/dateTimeUtil'
import { categories } from '../util/constants'

const AddExpense = ({ modal, onClose, isEdit, editExpense }) => {
	const { dispatch } = useExpenses()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [amount, setAmount] = useState('')
	const [category, setCategory] = useState('other')
	const [date, setDate] = useState(getDate())
	const [time, setTime] = useState(getTime())
	const [showAlert, setShowAlert] = useState(false)

	useEffect(() => {
		if (isEdit) {
			setTitle(editExpense.title)
			setDescription(editExpense.description)
			setAmount(editExpense.amount)
			setCategory(editExpense.category)
			setDate(getDate(editExpense.date))
			setTime(getTime(editExpense.date))
		}
	}, [])

	const onCloseHandler = () => {
		onClose(!modal)
	}

	const onSubmit = async () => {
		const expenseDate = `${date} ${time}`
		const expenseAmount = Number.parseInt(amount)

		if (!title || !description || !expenseAmount) {
			setShowAlert(true)
			return
		}

		const expense = { title, description, category, amount: expenseAmount, date: expenseDate }

		const id = isEdit ? `/${editExpense._id}` : ''
		const endpoint = `/app/expenses${id}`
		const method = isEdit ? 'PATCH' : 'POST'

		const response = await fetch(endpoint, {
			method,
			body: JSON.stringify(expense),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const json = await response.json()
		const dispatchType = isEdit ? 'UPDATE_EXPENSE' : 'CREATE_EXPENSE'

		if (!response.ok) {
			alert(JSON.stringify(json))
		}

		if (response.ok) {
			setTitle('')
			setDescription('')
			setAmount('')
			setCategory('other')
			setDate(getDate())
			setTime(getTime())
			setShowAlert(false)

			dispatch({ type: dispatchType, payload: json })

			if (isEdit) {
				onCloseHandler()
			}
		}
	}

	const renderAddExpense = () => {
		return (
			<Form>
				<Row>
					<Col>
						<FormGroup>
							<Label for='expenseTitle'>Title</Label>
							<Input
								value={title}
								id='expenseTitle'
								onChange={(e) => setTitle(e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<FormGroup>
						<Label for='expenseDescription'>Description</Label>
						<Input
							value={description}
							id='expenseDescription'
							onChange={(e) => setDescription(e.target.value)}
							type='textarea'
						/>
					</FormGroup>
				</Row>
				<Row>
					<Col>
						<FormGroup>
							<Label for='expenseAmount'>Amount</Label>
							<Input
								value={amount}
								id='expenseAmount'
								onChange={(e) => setAmount(e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for='expenseCategory'>Select</Label>
							<Input
								value={category}
								id='expenseCategory'
								type='select'
								onChange={(e) => setCategory(e.target.value)}>
								{categories.map((category, idx) => (
									<option key={idx}>{category}</option>
								))}
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup>
							<Label for='expenseDate'>Date</Label>
							<Input
								id='exampleDate'
								onChange={(e) => setDate(e.target.value)}
								value={date}
								type='date'
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for='expenseTime'>Time</Label>
							<Input
								id='expenseTime'
								onChange={(e) => setTime(e.target.value)}
								value={time}
								type='time'
							/>
						</FormGroup>
					</Col>
				</Row>
				{showAlert && (
					<Row className='mx-0'>
						<Alert color='danger'>Please enter the required fields</Alert>
					</Row>
				)}
			</Form>
		)
	}

	const renderFoooter = () => {
		return (
			<>
				<Button color='success' onClick={onSubmit}>
					{isEdit ? 'Edit' : 'Add'}
				</Button>{' '}
				<Button color='secondary' onClick={onCloseHandler}>
					Cancel
				</Button>
			</>
		)
	}

	return (
		<Modal isOpen={modal} toggle={onCloseHandler}>
			<ModalHeader toggle={onCloseHandler}>Add Expense</ModalHeader>
			<ModalBody>{renderAddExpense()}</ModalBody>
			<ModalFooter>{renderFoooter()}</ModalFooter>
		</Modal>
	)
}

export default AddExpense
