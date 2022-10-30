import Stack from '@mui/material/Stack'
import { Typography, Button } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Router from 'next/router'

const header = () => {
	interface State {
		category: Number
		name: String
		price: Number
		inStock: Boolean
		baseQuantity: String
		imageId: Number
	}

	const [values, setValues] = useState<State>({
		category: 0,
		name: '',
		price: 0,
		inStock: true,
		baseQuantity: '',
		imageId: 2,
	})
	const [add, setAdd] = useState(false)

	const addFill =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const sendDetails = async () => {
		setAdd(false)
		const tokenCheck = localStorage.getItem('Token')
		console.log(tokenCheck)
		const response = await fetch(
			'http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: tokenCheck as string,
				},
				body: JSON.stringify({
					category: Number(values.category),
					name: values.name,
					price: Number(values.price),
					inStock: values.inStock,
					baseQuantity: values.baseQuantity,
					imageId: Number(values.imageId),
				}),
			}
		).then((res) => res.json())
	}

	const BackButton = () => {
		alert('Logging out')
		console.log('im clicked')
		localStorage.removeItem('Token')
		const TokenCheck = localStorage.getItem('Token')
		if (TokenCheck === null) {
			Router.push('/login')
		}
		console.log(TokenCheck)
	}

	const AddItems = () => {
		setAdd(true)
	}

	// console.log("Name: ", values.name)
	// console.log("category: ", values.category)
	// console.log("price ", values.price)
	// console.log("baseQuantity ", values.baseQuantity)

	return (
		<>
			<Stack
				sx={{
					// border: '2px solid red',
					paddingLeft: '20vw',
					marginTop: '7vh',
				}}
				direction='row'
				spacing={30}>
				<Button variant='outlined' onClick={BackButton}>
					Back
				</Button>
				<Typography
					sx={{ fontSize: 'larger', fontWeight: '700', paddingTop: '1vh' }}>
					{' '}
					Items
				</Typography>
				<Button variant='outlined' onClick={AddItems}>
					+ Add new Items
				</Button>
			</Stack>

			{add ? (
				<Box
					component='form'
					sx={{
						width: '20vw',
						height: '60vh',
						padding: '2%',
						position: 'absolute',
						top: '20vh',
						left: '40vw',
						background: 'white',
						zIndex: '100',
						borderRadius: '10px',
					}}
					noValidate
					autoComplete='off'>
					<TextField
						label='Category'
						variant='standard'
						focused
						value={values.category}
						onChange={addFill('category')}
					/>
					<TextField
						label='Name'
						variant='standard'
						focused
						value={values.name}
						onChange={addFill('name')}
					/>
					<TextField
						label='Price'
						variant='standard'
						focused
						value={values.price}
						onChange={addFill('price')}
					/>

					<TextField
						label='Base Qty.'
						variant='standard'
						focused
						value={values.baseQuantity}
						onChange={addFill('baseQuantity')}
					/>
					<TextField
						label='Image'
						variant='standard'
						focused
						value={values.imageId}
						onChange={addFill('imageId')}
					/>

					<Button
						variant='contained'
						onClick={sendDetails}
						sx={{ marginTop: '2vh' }}>
						Done
					</Button>
				</Box>
			) : (
				<></>
			)}
		</>
	)
}

export default header
