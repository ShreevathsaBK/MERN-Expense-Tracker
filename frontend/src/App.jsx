import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AppNavBar from './components/NavBar'
import { useAuth } from './hooks/useAuth'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

function App() {
	const { user } = useAuth()

	return (
		<div className='app'>
			<AppNavBar />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
					<Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
