import { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Expenses from '../components/Expenses'
import '../style/dashboard.css'

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<Container>
				<Row className='gap-5'>
					<Col className='col-4 p-4 d-flex flex-column justify-content-between bg-white rounded shadow-lg'>
						<Expenses expenses />
					</Col>
					<Col className='gap-5 d-flex flex-column col-7 p-4 bg-white rounded shadow-lg'></Col>
				</Row>
			</Container>
		</div>
	)
}

export default Dashboard
