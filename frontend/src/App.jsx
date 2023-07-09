import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AppNavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

function App() {
	return (
		<div className='app'>
			<AppNavBar />
			<BrowserRouter>
				<div className='pages'>
					<Routes>
						<Route path='/' element={<Dashboard />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
