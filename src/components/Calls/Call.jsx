import {Box, Button, styled, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import CallIcon from '@mui/icons-material/Call'
import {motion} from 'framer-motion'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getFormattedTime} from '../../utils/helpers'
import {CallShape} from '../../utils/shapes'

const Wrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  margin: 1rem 0;
  cursor: pointer;
`

const Time = styled(Box)`
  display: flex;
  color: var(--text-light);
  font-weight: 500;
  border-left: 3px dotted var(--border);
  padding: 0 1rem 0 .875rem;
`

const Contact = styled(Box)`
  display: flex;
  align-items: center;
  gap: .5rem;
`

const Activity = styled(motion.div)`
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 10;
  touch-action: pan-x;
`

const DayNight = styled(Box)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: 1px solid var(--border);
  border-right: none;
  padding: .2rem;
  border-radius: .15rem 0 0 .15rem;
  color: var(--text-light);
`

const DeleteButton = styled(Button)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 50%;
  display: flex;
  justify-content: flex-end;
  background: var(--red);
  color: white;
  font-weight: bold;
  z-index: 5;
  border-radius: 1rem;
`

const Call = ({id, created_at, from, to, onDelete}) => {
	const {ampm, time} = getFormattedTime(created_at)
	const [dragging, setDragging] = useState(false)
	const navigate = useNavigate()

	const toggleDrag = isDragged => () => setDragging(isDragged)

	const handleDragEnd = (event, info) => {
		toggleDrag(false)()
		if (info.offset.x < -100) {
			onDelete(id)
		}
	}

	const handleActivity = () => {
		if (!dragging) {
			navigate(`/calls/${id}`)
		}
	}

	return (
		<Wrapper>
			<DeleteButton onClick={onDelete}>Delete</DeleteButton>
			<Activity
				onMouseUp={handleActivity}
				drag="x"
				dragConstraints={{left: -125, right: 0}}
				dragElastic={0.05}
				whileDrag={{scale: 1.03}}
				dragTransition={{
					type: 'tween', duration: 0.3, ease: 'easeOut'
				}}
				onDragStart={toggleDrag(true)}
				onDragEnd={handleDragEnd}
			>
				<Contact>
					<CallIcon/>
					<Box>
						<Typography
							sx={{fontSize: '0.875rem', color: 'var(--text)', fontWeight: 500}}>{from}</Typography>
						<Typography sx={{fontSize: '0.65rem', color: 'var(--text-light)'}}>
                            Tried to call on {to}
						</Typography>
					</Box>
				</Contact>
				<Time>{time}</Time>
				<DayNight>
					{ampm}
				</DayNight>
			</Activity>
		</Wrapper>
	)
}

Call.propTypes = {
	...CallShape.propTypes,
	onDelete: PropTypes.func.isRequired,
}

export default Call