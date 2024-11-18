import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './css/body.css'
import './css/index.css'
import './css/header.css'
import {Box} from '@mui/material'
import Header from './components/Header/Header'
import Inbox from './pages/Inbox'
import Footer from './components/Footer'
import {Route, Routes} from 'react-router-dom'
import ActivityDetail from './pages/ActivityDetail'

const App = () => {
	return (
		<Box className="container">
			<Header/>
			<Routes>
				<Route path="/" element={<Inbox/>}/>
				<Route path="/calls" element={<Inbox/>}/>
				<Route path="/archive" element={<Inbox/>}/>
				<Route path="/calls/:id" element={<ActivityDetail/>}/>
			</Routes>
			<Footer/>
		</Box>
	)
}

export default App
