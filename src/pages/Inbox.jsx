import {Box, Button, styled, Typography} from '@mui/material'
import {useEffect, useMemo, useState} from 'react'
import {archiveActivities, getActivities, resetActivities} from '../api/api'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import Calls from '../components/Calls'
import Loader from '../components/Loader'
import {useLocation} from 'react-router-dom'


const Archive = styled(Button)`
  border-radius: 0 0 5px 5px;
  border: 1px solid rgb(225, 225, 225);
  border-top: none;
  color: rgb(96, 96, 96);
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  gap: .5rem;
  text-transform: none;
`

const Content = styled(Box)`
  flex-grow: 1;
  background: rgb(250, 250, 249);
  padding: 0 1rem;
`

const Inbox = () => {
	const [activities, setActivities] = useState()
	const [loading, setLoading] = useState(false)
	const {pathname} = useLocation()
	const archivePage = useMemo(() => pathname === '/archive', [pathname])

	const filteredData = useMemo(() => (
		activities?.filter(activity => archivePage ? activity.is_archived : !activity.is_archived)
	), [archivePage, activities])

	const handleArchive = async () => {
		setLoading(true)
		archivePage ? await resetActivities() : await archiveActivities(filteredData)
		const newData = await getActivities()
		setActivities(newData)
		setLoading(false)
	}

	useEffect(() => {
		(async () => {
			setLoading(true)
			const res = await getActivities()
			setLoading(false)
			setActivities(res)
		})()
	}, [])

	return (
		<Content>
			<Archive onClick={handleArchive}>
				{archivePage ? <UnarchiveIcon/> : <ArchiveIcon/>}
				<Typography sx={{fontSize: '.875rem', fontWeight: 500}}>
					{`${archivePage ? 'Unarchive' : 'Archive'} all calls`}
				</Typography>
			</Archive>
			{filteredData && (
				<Calls
					data={filteredData}
					setLoading={setLoading}
					archivePage={archivePage}
					setActivities={setActivities}
				/>
			)}
			{loading && <Loader/>}
		</Content>
	)
}

export default Inbox