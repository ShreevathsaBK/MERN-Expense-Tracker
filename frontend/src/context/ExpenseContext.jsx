import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext()

const expensesReducer = (state, action) => {
	switch (action.type) {
		case 'SET_EXPENSES':
			return {
				expenses: action.payload,
			}
		case 'CREATE_EXPENSE':
			return {
				expenses: [action.payload, ...state.expenses],
			}
		case 'UPDATE_EXPENSE':
			return {
				expenses: state.expenses.map((e) =>
					e._id === action.payload._id ? action.payload : e
				),
			}
		case 'DELETE_EXPENSE':
			return {
				expenses: state.expenses.filter((e) => e._id !== action.payload._id),
			}
		default:
			return state
	}
}

export const ExpensesContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(expensesReducer, { expenses: [] })

	return (
		<ExpensesContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ExpensesContext.Provider>
	)
}
