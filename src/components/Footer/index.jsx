import {Box, IconButton, styled} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import PersonIcon from '@mui/icons-material/Person'
import DialpadIcon from '@mui/icons-material/Dialpad'
import SettingsIcon from '@mui/icons-material/Settings'
import {useState} from 'react'
import {Link} from 'react-router-dom'

const End = styled(Box)`
  background: var(--green);
  margin: .375rem;
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  position: relative;
  border-radius: 50%;

  &:after {
    opacity: .5;
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    inset: -.5rem;
    border: 1px solid var(--text-light);
  }
`

const Content = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
`

const IconWrapper = styled(IconButton, {shouldForwardProp: (prop) => prop !== 'active' && prop !== 'central'})(({
	active,
	central
}) => ({
	...(active && !central && {
		'&:after': {
			left: 0,
			right: 0,
			height: '3px',
			content: '""',
			display: 'block',
			position: 'absolute',
			bottom: '-1rem',
			background: 'var(--green)'
		}
	})
}))

const CentralButton = styled(IconWrapper)`
  border-radius: 50%;
  position: relative;
  color: #fff;
  transform: scale(1.3) translateY(-30%);
  z-index: 2;

  & > div {
    left: 0;
    right: 0;
    height: 3px;
    position: absolute;
    bottom: -20px;
    background: var(--green);
  }

  svg {
    position: relative;
    z-index: 3;
  }

  &:before {
    content: "";
    position: absolute;
    inset: -.375rem;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 50%;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--green);
    border-radius: 50%;
  }
`


const Footer = () => {
	const [active, setActive] = useState('call')
	const handelActiveTab = tab => () => setActive(tab)

	return (
		<Content>
			<Link to='/'>
				<IconWrapper active={active === 'call'} onClick={handelActiveTab('call')}>
					<CallIcon/>
				</IconWrapper>
			</Link>
			<Link to='/'>
				<IconWrapper active={active === 'account'} onClick={handelActiveTab('account')}>
					<PersonIcon/>
				</IconWrapper>
			</Link>
			<Link to='/'>
				<CentralButton active={active === 'dial'} central onClick={handelActiveTab('dial')}>
					<DialpadIcon/>
					{active === 'dial' && <Box/>}
				</CentralButton>
			</Link>
			<Link to='/'>
				<IconWrapper active={active === 'settings'} onClick={handelActiveTab('settings')}>
					<SettingsIcon/>
				</IconWrapper>
			</Link>
			<Link to='/'>
				<IconWrapper active={active === 'end'} onClick={handelActiveTab('end')}>
					<End/>
				</IconWrapper>
			</Link>
		</Content>
	)
}

export default Footer