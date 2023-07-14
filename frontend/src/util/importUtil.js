import { TEMPLATE_HEADERS } from './constants'
import Papa from 'papaparse'
import { parseDate } from './dateTimeUtil'

export const transformCSV = (value, header) => {
	switch (header) {
		case 'date':
			return parseDate(value)
		case 'amount':
			return Number.parseInt(value)
		default:
			return value
	}
}

export const downloadCSV = (e) => {
	e.preventDefault()

	const csv = Papa.unparse({
		fields: TEMPLATE_HEADERS,
	})
	const hiddenAnchor = document.createElement('a')

	hiddenAnchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
	hiddenAnchor.download = 'Expenses.csv'
	hiddenAnchor.click()
}

export const validateValues = (expenses) => {
	for (let expense of expenses) {
		for (let header of TEMPLATE_HEADERS) {
			let value = expense[header]

			if (!value) return false
		}
	}

	return true
}
