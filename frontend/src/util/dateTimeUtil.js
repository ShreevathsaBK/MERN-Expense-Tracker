export const getDate = (date = null) => {
	if (date) {
		return new Date(date).toISOString().split('T')[0]
	}
	return new Date().toISOString().split('T')[0]
}

export const getTime = (date = null) => {
	if (date) {
		return new Date(date).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
	}
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}
