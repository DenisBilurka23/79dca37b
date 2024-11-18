export const getFormattedTime = time => {
	if (!time) {
		return null
	}

	const date = new Date(time)
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'PM' : 'AM'
	const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`
	const day = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})

	return {ampm, time: formattedTime, day}
}