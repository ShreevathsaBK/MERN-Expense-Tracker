import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Row,
	Col,
	Input,
	FormGroup,
	Alert,
	Label,
} from 'reactstrap'
import { useExpenses } from '../hooks/useExpenses'
import { useState } from 'react'
import { downloadCSV } from '../util/importUtil'
import { TEMPLATE_HEADERS } from '../util/constants'
import { getDate } from '../util/dateTimeUtil'
import Papa from 'papaparse'

const ExportModal = ({ exportModal, onClose }) => {
	const { expenses } = useExpenses()

	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const [fileType, setFileType] = useState('')

	const [showAlert, setShowAlert] = useState(false)
	const [message, setMessage] = useState('')

	const alertMessage = (msg) => {
		setShowAlert(true)
		setMessage(msg)
	}

	const getExportExpenses = (startDate, endDate) =>
		expenses.filter((expense) => expense.date >= startDate && expense.date <= endDate)

	const exportToCSV = (expenses) => {
		const csv = Papa.unparse({
			fields: TEMPLATE_HEADERS,
			data: expenses.map(({ date, title, amount, category, description }) => [
				getDate(date),
				title,
				amount,
				category,
				description,
			]),
		})

		downloadCSV(csv)
	}

	const exportExpense = () => {
		if (!startDate || !endDate) {
			alertMessage('Please select start date and end date')
			return
		}

		if (endDate < startDate) {
			alertMessage('End date must be greater than start date')
			return
		}

		if (!fileType) {
			alertMessage('Select File Type')
			return
		}

		const exportExpenses = getExportExpenses(startDate, endDate)
		exportToCSV(exportExpenses)

		setShowAlert(false)
	}

	const renderExportBody = () => {
		return (
			<FormGroup className='mx-3 d-flex flex-column gap-4'>
				<Row>
					<Col>
						<Label for='startDate'>Start Date</Label>
						<Input
							id='startDate'
							onChange={(e) => setStartDate(e.target.value)}
							type='date'
						/>
					</Col>
					<Col>
						<Label for='endDate'>End Date</Label>
						<Input
							id='endDate'
							onChange={(e) => setEndDate(e.target.value)}
							type='date'
						/>
					</Col>
				</Row>
				<Row>
					<Label for='fileType'>File Type</Label>
					<FormGroup onChange={(e) => setFileType(e.target.value)}>
						<Input value='CSV' name='fileType' type='radio' /> CSV
						<Input value='PDF' name='fileType' type='radio' /> PDF
					</FormGroup>
				</Row>
				{showAlert && (
					<Row>
						<Alert className='mx-auto' style={{ width: '95%' }} color='danger'>
							{message}
						</Alert>
					</Row>
				)}
			</FormGroup>
		)
	}

	const renderFooter = () => {
		return (
			<>
				<Button color='primary' onClick={exportExpense}>
					Export
				</Button>{' '}
				<Button color='secondary' onClick={onClose}>
					Cancel
				</Button>
			</>
		)
	}

	return (
		<Modal isOpen={exportModal} toggle={onClose}>
			<ModalHeader toggle={onClose}>Export Expenses</ModalHeader>
			<ModalBody>{renderExportBody()}</ModalBody>
			<ModalFooter>{renderFooter()}</ModalFooter>
		</Modal>
	)
}

export default ExportModal
