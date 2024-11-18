import {Box, styled, Typography} from '@mui/material'
import {motion, AnimatePresence} from 'framer-motion'
import Call from './Call'
import PropTypes, {arrayOf} from 'prop-types'
import {archiveActivity, getActivities} from '../../api/api'
import {getFormattedTime} from '../../utils/helpers'
import {CallShape} from '../../utils/shapes'

const Day = styled(Typography)`
  margin: 1rem;
  color: var(--text-light);
  font-size: .875rem;
  position: relative;
  z-index: 10;
  text-align: center;

  &:before {
    content: "";
    display: block;
    z-index: -1;
    position: absolute;
    background: var(--background);
    height: 100%;
    width: 100px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    z-index: -2;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    border-top: 3px dotted var(--border);
  }
`

const Calls = ({data, setLoading, archivePage, setActivities}) => {
	let previousDay = null

	const deleteHandler = async (id) => {
		setLoading(true)
		await archiveActivity(id, !archivePage)
		const newData = await getActivities()
		setActivities(newData)
		setLoading(false)
	}

	return (
		<Box>
			<AnimatePresence mode='wait'>
				<motion.div layout>
					{data.map(({id, created_at, from, to}) => {
						const {day} = getFormattedTime(created_at)
						const isNewDay = day !== previousDay
						previousDay = day

						return (
							<motion.div
								key={id}
								layout
								initial={{opacity: 0, y: -10}}
								animate={{opacity: 1, y: 0}}
								exit={{opacity: 0, y: 10}}
								transition={{duration: 0.3}}
							>
								{isNewDay && <Day variant="h6">{day}</Day>}
								<Call id={id} created_at={created_at} from={from} to={to} onDelete={deleteHandler}/>
							</motion.div>
						)
					})}
				</motion.div>
			</AnimatePresence>
		</Box>
	)
}

Calls.propTypes = {
	archivePage: PropTypes.bool.isRequired,
	data: arrayOf(CallShape).isRequired,
	setLoading: PropTypes.func.isRequired,
	setActivities: PropTypes.func.isRequired,
}

export default Calls
