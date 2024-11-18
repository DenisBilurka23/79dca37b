import PropTypes, {shape} from 'prop-types'

export const CallShape = shape({
	id: PropTypes.string.isRequired,
	created_at: PropTypes.string.isRequired,
	from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	direction: PropTypes.string,
	duration: PropTypes.number,
	is_archived: PropTypes.bool,
	call_type: PropTypes.string,
})