import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Row,
	Input,
	FormGroup,
} from 'reactstrap'

const ImportModal = ({ importModal, onClose }) => {
	const renderImportBody = () => {
		return (
			<FormGroup className='mx-3'>
				<Row>
					<h6>Downlaod the Template</h6>
					<a href=''>Expenses.csv</a>
				</Row>
				<Row className='mt-4'>
					<h6>Template Uplaod</h6>
					<Input
						className='border border-secondary mx-auto'
						style={{ width: '95%' }}
						id='fileUpload'
						type='file'
					/>
				</Row>
			</FormGroup>
		)
	}

	const renderFooter = () => {
		return (
			<>
				<Button color='primary' onClick={onClose}>
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
