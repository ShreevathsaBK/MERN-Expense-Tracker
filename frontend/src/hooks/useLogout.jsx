import { useAuth } from './useAuth'
import { useExpenses } from './useExpenses'

export const useLogout = () => {
	const { dispatch } = useAuth()
	const { dispatch: expenseDispatch } = useExpenses()

	const logout = () => {
		localStorage.removeItem('user')
		dispatch({ type: 'LOGOUT' })
		expenseDispatch({ type: 'SET_EXPENSES', payload: [] })
	}

	return { logout }
}
