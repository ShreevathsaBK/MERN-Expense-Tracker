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
import { compareArrays } from '../util/arrayUtil'
import { transformCSV, download, validateValues } from '../util/importUtil'
import { useExpenses } from '../hooks/useExpenses'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const ImportModal = ({ importModal, onClose }) => {
	const { dispatch } = useExpenses()
	const { user } = useAuth()

	const [alert, setAlert] = useState(false)
	const [message, setMessage] = useState('')
	const [color, setColor] = useState('danger')
	const [fileData, setFileData] = useState({})

	const alertMessage = (msg) => {
		setAlert(true)
		setMessage(msg)
	}

	const resetDefault = () => {
		setAlert(false)
		setMessage('')
		setColor('danger')
		setFileData({})
	}

	const importExpense = async () => {
		if (!user) return
		if (color === 'success') {
			const expenses = fileData.data

			const response = await fetch('/app/expenses?multiple=true', {
				method: 'POST',
				body: JSON.stringify(expenses),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
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
		} else {
			alertMessage('No file uploaded')
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

		if (!validateValues(expenses)) {
			alertMessage('Enter all the fields or give valid values in csv')
			return
		}

		setColor('success')
		alertMessage('File Upload successful')
	}

	const onUpload = (e) => {
		resetDefault()

		const file = e.target.files[0]

		Papa.parse(file, {
			header: true,
			skipEmptyLines: 'greedy',
			transform: transformCSV,
			complete: (fileData) => {
				setFileData(fileData)
				validateCSV(fileData)
			},
		})
	}

	const renderImportBody = () => {
		return (
			<FormGroup className='mx-3 d-flex flex-column gap-4'>
				<Row>
					<h6>Downlaod the Template</h6>
					<a onClick={download} href=''>
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
						onClick={(e) => (e.target.value = '')}
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
