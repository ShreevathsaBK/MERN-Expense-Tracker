import { Container, Row, Col } from 'reactstrap'

import Expenses from '../components/Expenses'
import Graphs from '../components/Graphs'
import '../style/dashboard.css'

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<Container className='mx-auto' fluid>
				<Row className='justify-content-around'>
					<Col className='col-4 p-4 d-flex flex-column justify-content-between bg-white rounded shadow-lg'>
						<Expenses expenses />
					</Col>
					<Col className='col-7 p-4 d-flex flex-column justify-content-between bg-white rounded shadow-lg'>
						<Graphs />
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Dashboard
