import Stack from '@mui/material/Stack'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import logo from '../public/images/White BG.svg'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import Router from 'next/router'

const navbar = () => {
	const logoutUser = () => {
		console.log('im clicked')
		localStorage.removeItem('Token')
		const TokenCheck = localStorage.getItem('Token')
		if (TokenCheck === null) {
			Router.push('/login')
		}
		console.log(TokenCheck)
	}

	return (
		<>
			{/* ===========================NAVBAR============================= */}
			<Stack
				sx={{
					// border: '1px solid red',
					backgroundColor: '#F88A12',
				}}
				direction='row'
				spacing={120}>
				<Stack direction='row' spacing={1}>
					<Image src={logo} />
					<Typography
						sx={{
							color: 'white',
							// border: '2px solid green',
							paddingTop: '2vh',
							fontSize: 'larger',
							fontWeight: '600',
						}}>
						{' '}
						Dashboard
					</Typography>
				</Stack>
				<Stack direction='row'>
					<Button
						variant='text'
						// onClick={logoutUser}
						sx={{
							color: 'white',
						}}>
						<PersonAddAltIcon></PersonAddAltIcon>
					</Button>
					<Button
						variant='text'
						onClick={logoutUser}
						sx={{
							color: 'white',
						}}>
						<LogoutIcon></LogoutIcon>
					</Button>
				</Stack>
			</Stack>
		</>
	)
}

export default navbar
