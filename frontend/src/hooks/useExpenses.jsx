import { useContext } from 'react'
import { ExpensesContext } from '../context/ExpenseContext'

export const useExpenses = () => {
	const context = useContext(ExpensesContext)

	if (!context) {
		throw Error('useExpenses must be used inside an ExpenseContextProvider')
	}
	return context
}
