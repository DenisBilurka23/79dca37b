import axios from 'axios'

export const getActivities = async () => {
	try {
		// eslint-disable-next-line no-undef
		const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/activities`)
		return res.data
	} catch (e) {
		console.log('error: ', e)
	}
}

export const getActivity = async id => {
	try {
		// eslint-disable-next-line no-undef
		const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/activities/${id}`)
		return res.data
	} catch (e) {
		console.log('error: ', e)
	}
}

export const archiveActivity = async (id, is_archived) => {
	try {
		// eslint-disable-next-line no-undef
		await axios.patch(`${process.env.REACT_APP_BASE_URL}/activities/${id}`, {is_archived})
	} catch (e) {
		console.log('error: ', e)
	}
}

export const archiveActivities = async (activities) => {
	try {
		const archivePromises = activities.map(activity =>
			archiveActivity(activity.id, true)
		)
		await Promise.all(archivePromises)
	} catch (e) {
		console.log('error: ', e)
	}
}

export const resetActivities = async () => {
	try {
		// eslint-disable-next-line no-undef
		const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/reset`)
		return res.data
	} catch (e) {
		console.log('error: ', e)
	}
}