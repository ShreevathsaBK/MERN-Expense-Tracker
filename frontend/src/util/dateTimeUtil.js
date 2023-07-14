import { DateTime } from 'luxon'

export const getCurrMonth = () => new Date().getMonth()

export const getCurrYear = () => new Date().getFullYear()

export const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

export const getDate = (date = null) => {
	const dateTime = date ? DateTime.fromISO(date) : DateTime.local()
	return dateTime.toISODate()
}

export const getTime = (date = null) => {
	const dateTime = date ? DateTime.fromISO(date) : DateTime.local()
	return dateTime.toFormat('HH:mm')
}

export const parseDate = (date) => {
	const formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'dd MM yyyy']

	let parsedDate

	for (const format of formats) {
		parsedDate = DateTime.fromFormat(date, format)

		if (parsedDate.isValid) {
			break
		}
	}

	return parsedDate.isValid
		? DateTime.fromISO(`${parsedDate.toISODate()}T${getTime()}`).toISO()
		: null
}
