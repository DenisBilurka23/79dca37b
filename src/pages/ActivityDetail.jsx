import {Box, Typography, styled, Divider, Paper, Button} from '@mui/material'
import {useParams} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'
import {archiveActivity, getActivity} from '../api/api'
import Loader from '../components/Loader'
import {getFormattedTime} from '../utils/helpers'

const Content = styled(Box)`
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CallInfoBox = styled(Paper)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const CallTitle = styled(Typography)`
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text);
`

const CallDetail = styled(Typography)`
  font-size: 0.95rem;
  color: var(--text-light);
`

const DurationBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
`

const CallDetailHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const ActionButton = styled(Button, {shouldForwardProp: (prop) => prop !== 'isArchived'})`
  background-color: ${props => (props.isArchived ? '#4caf50' : '#ff6f61')};
  color: #fff;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => (props.isArchived ? '#388e3c' : '#ff3b2d')};
  }
`

const ActivityDetail = () => {
	const {id} = useParams()
	const [data, setData] = useState()
	const [loading, setLoading] = useState(false)
	const formattedTime = useMemo(() => (
		getFormattedTime(data?.created_at)
	), [data])

	useEffect(() => {
		(async () => {
			setLoading(true)
			const res = await getActivity(id)
			setData(res)
			setLoading(false)
		})()
	}, [id])

	const handleArchive = async () => {
		try {
			setLoading(true)
			await archiveActivity(id, !data.is_archived)
			const res = await getActivity(id)
			setData(res)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Content>
			{data && (
				<CallInfoBox>
					<CallDetailHeader>
						<CallTitle>
							{data.direction === 'inbound' ? 'Inbound' : 'Outbound'} Call
						</CallTitle>
						<Box sx={{
							color: 'var(--text-light)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end'
						}}>
							<Typography>{`${formattedTime?.day}`}</Typography>
							<Typography>{`${formattedTime?.time} ${formattedTime?.ampm}`} </Typography>
						</Box>
					</CallDetailHeader>
					<Divider/>
					<CallDetail>
						<strong>From:</strong> {data.from}
					</CallDetail>
					<CallDetail>
						<strong>To:</strong> {data.to}
					</CallDetail>
					<CallDetail>
						<strong>Via:</strong> {data.via}
					</CallDetail>
					<Divider/>
					<DurationBox>
						<Typography><strong>Duration:</strong></Typography>
						<Typography>{data.duration > 0 ? `${data.duration} seconds` : 'N/A'}</Typography>
					</DurationBox>
					<CallDetail>
						<strong>Call Type:</strong> {data.call_type}
					</CallDetail>
					<ActionButton
						disabled={loading}
						onClick={handleArchive}
						isArchived={data.is_archived}
					>
						{data.is_archived ? 'Unarchive' : 'Archive'} Call
					</ActionButton>
				</CallInfoBox>
			)}
			{loading && <Loader/>}
			{!loading && !data && <Typography>Call not found</Typography>}
		</Content>
	)
}

export default ActivityDetail
