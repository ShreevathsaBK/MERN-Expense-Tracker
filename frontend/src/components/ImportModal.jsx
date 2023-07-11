import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Row,
	Input,
	FormGroup,
	Alert,
} from 'reactstrap'
import Papa from 'papaparse'
import { TEMPLATE_HEADERS } from '../util/constants'
import { useExpenses } from '../hooks/useExpenses'
import { useState } from 'react'
import { compareArrays } from '../util/arrayUtil'

const ImportModal = ({ importModal, onClose }) => {
	const { dispatch } = useExpenses()
	const [alert, setAlert] = useState(false)
	const [message, setMessage] = useState('')
	const [color, setColor] = useState('danger')
	const [fileData, setFileData] = useState({})

	const alertMessage = (msg) => {
		setAlert(true)
		setMessage(msg)
	}

	const importExpense = async () => {
		if (color === 'success') {
			const expenses = fileData.data

			const response = await fetch('/app/expenses?multiple=true', {
				method: 'POST',
				body: JSON.stringify(expenses),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const json = await response.json()

			if (!response.ok) {
				alert(JSON.stringify(json))
			}

			if (response.ok) {
				dispatch({ type: 'CREATE_EXPENSES', payload: json })
				onClose()
			}
		}
	}

	const validateCSV = (csvData) => {
		const expenses = csvData.data
		const headers = csvData.meta.fields

		if (!compareArrays(TEMPLATE_HEADERS, headers)) {
			alertMessage('Content in csv does not match the template')
			return
		}

		if (!expenses.length) {
			alertMessage('You have not entered any expense')
			return
		}

		expenses.forEach((expense) => {
			TEMPLATE_HEADERS.forEach((header) => {
				if (expense[header] === '') {
					alertMessage('Please enter all the fields in csv')
					return
				}
			})
		})

		setColor('success')
		alertMessage('File Upload successful')
	}

	const onUpload = (e) => {
		setColor('danger')
		setAlert(false)
		setMessage('')

		const file = e.target.files[0]

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (fileData) => {
				console.log(fileData)
				setFileData(fileData)
				validateCSV(fileData)
			},
		})
	}

	const downloadCSV = (e) => {
		e.preventDefault()

		const csv = Papa.unparse({
			fields: TEMPLATE_HEADERS,
		})
		const hiddenAnchor = document.createElement('a')

		hiddenAnchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
		hiddenAnchor.download = 'Expenses.csv'
		hiddenAnchor.click()
	}

	const renderImportBody = () => {
		return (
			<FormGroup className='mx-3 d-flex flex-column gap-4'>
				<Row>
					<h6>Downlaod the Template</h6>
					<a onClick={downloadCSV} href=''>
						Expenses.csv
					</a>
				</Row>
				<Row>
					<h6>Template Uplaod</h6>
					<Input
						id='fileUpload'
						type='file'
						accept='.csv'
						onChange={onUpload}
						className='border border-secondary mx-auto'
						style={{ width: '95%' }}
					/>
				</Row>
				{alert && (
					<Row>
						<Alert className='mx-auto' style={{ width: '95%' }} color={color}>
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
				<Button color='primary' onClick={importExpense}>
					Import
				</Button>{' '}
				<Button color='secondary' onClick={onClose}>
					Cancel
				</Button>
			</>
		)
	}

	return (
		<Modal isOpen={importModal} toggle={onClose}>
			<ModalHeader toggle={onClose}>Import Expense from CSV</ModalHeader>
			<ModalBody>{renderImportBody()}</ModalBody>
			<ModalFooter>{renderFooter()}</ModalFooter>
		</Modal>
	)
}

export default ImportModal
