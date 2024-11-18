import React from 'react'
import {Box, styled, IconButton} from '@mui/material'
import Logo from '../Logo'
import SettingsIcon from '@mui/icons-material/Settings'
import {Link, useLocation} from 'react-router-dom'

const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--border);
`

const ButtonsContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  background: var(--background);
  z-index: 1;
  margin: .25rem .25rem 0;
  border: 1px solid var(--border);
  border-radius: .375rem .375rem 0 0;
  border-bottom: 0;
`

const StyledLink = styled(Link, {shouldForwardProp: (prop) => prop !== 'active'})(({active}) => ({
	position: 'relative',
	textDecoration: 'none',
	display: 'block',
	height: '100%',
	borderRadius: 0,
	color: active ? 'rgb(96, 96, 96)' : 'rgb(159, 159, 159)',
	borderRight: '3px dotted var(--border)',
	padding: '0 1.5rem',
	...(active && {
		'&:after': {
			width: '50%',
			height: '3px',
			content: '""',
			display: 'block',
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			bottom: '-22px',
			background: 'orange'
		}
	})
}))


const Header = () => {
	const {pathname} = useLocation()
	
	return (
		<HeaderWrapper>
			<Box sx={{padding: '0 1rem'}}>
				<Logo/>
			</Box>
			<ButtonsContainer>
				<StyledLink to='/calls' active={pathname === '/calls' || pathname === '/'}>All calls</StyledLink>
				<StyledLink to='/archive' active={pathname === '/archive'}>Archive</StyledLink>
				<IconButton sx={{padding: '1rem'}}>
					<SettingsIcon/>
				</IconButton>
			</ButtonsContainer>
		</HeaderWrapper>
	)
}

export default Header
