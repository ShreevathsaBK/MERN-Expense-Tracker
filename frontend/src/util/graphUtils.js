import { DateTime } from 'luxon'

export const calculateDayTotals = (expenses, day, month, year) => {
	const currentDate = DateTime.fromObject({ day, month: month + 1, year }).toISODate()

	return expenses
		.filter((expense) => {
			const expDate = DateTime.fromISO(expense.date).toISODate()
			return expDate === currentDate
		})
		.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
}

export const calculateCategoryTotals = (expenses, category, month, year) => {
	return expenses
		.filter((expense) => {
			const { month: expMonth, year: expYear } = DateTime.fromISO(expense.date)
			return month + 1 === expMonth && year === expYear && expense.category === category
		})
		.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
}
