import { useState, useEffect, FC } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import Router from 'next/router'
import { Paper, Typography } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import EditIcon from '@mui/icons-material/Edit'
import Stack from '@mui/material/Stack'
import Navbar from './navbar'
import Header from './header'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import { BorderAllRounded } from '@mui/icons-material'

const Dashboard = () => {
	const [items, setItems] = useState<any[]>([])
	const [arr, setArr] = useState<any[]>([])
	const [add, setAdd] = useState(false)
	const [id, setId] = useState()
	const [again, setAgain] = useState(false)

	interface State {
		category: Number
		name: String
		price: Number
		inStock: Boolean
		baseQuantity: String
		imageId: Number
	}

	const [prefill, setPrefill] = useState<State>({
		category: 0,
		name: '',
		price: 0,
		inStock: false,
		baseQuantity: '',
		imageId: 2,
	})

	let all: any = []
	let vege: any = []
	let fru: any = []
	let other: any = []

	const editFill =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setPrefill({ ...prefill, [prop]: event.target.value })
		}

	useEffect(() => {
		const tokenCheck = localStorage.getItem('Token')

		if (tokenCheck !== undefined && tokenCheck != null) {
			Router.push('/dashboard')
		} else {
			Router.push('/login')
		}
		// setAll(true)
		try {
			;(async () => {
				const response = await axios.get(
					'http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item',
					{
						headers: { Authorization: tokenCheck as string },
					}
				)

				vege = response.data.filter(
					(item: { categoryID: number }) => item.categoryID === 1
				)
				fru = response.data.filter(
					(item: { ctegoryID: number }) => item.ctegoryID === 2
				)
				other = response.data.filter(
					(item: { categoryID: number }) =>
						item.categoryID !== 1 && item.categoryID !== 2
				)

				setItems(response.data)
			})()
		} catch (error) {
			console.error('Error fetching data: ', error)
		}

		// items.map((iem: any) => {
		// 	all.push(iem)
		// 	if (iem.categoryID == '1') vege.push(iem)
		// 	else if (iem.categoryID == '2') fru.push(iem)
		// 	else if (iem.categoryID != '1' && iem.categoryID != '2') other.push(iem)
		// })
		// console.log('All', all)
		// console.log('Vege', vege)
		// console.log('Fru', fru)
		// console.log('Others', other)
		setArr(items)
	}, [again])

	const editFills = (itemie: any) => {
		setAdd(true)
		setId(itemie.id)

		setPrefill({
			category: Number(itemie.id),
			name: itemie.name,
			price: Number(itemie.price),
			inStock: false,
			baseQuantity: itemie.baseQuantity,
			imageId: Number(itemie.image),
		})
	}

	const InstockFills = async (itemss: any, index: number) => {
		const tokenCheck = localStorage.getItem('Token')

		const id = itemss.id
		const newItems = items.map((item, inStockIndex) => {
			if (inStockIndex === index) return { ...item, inStock: !item.inStock }
			return item
		})
		setItems(newItems)
		const body = {
			category: Number(itemss.categoryID),
			name: itemss.name,
			price: Number(itemss.price),
			inStock: !itemss.inStock,
			baseQuantity: itemss.baseQuantity,
			imageId: Number(itemss.imageId),
		}
		const response = await fetch(
			`http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
			{
				method: 'PUT',
				headers: { Authorization: tokenCheck as string },
				body: JSON.stringify(body),
			}
		)

		if (response.status !== 201) {
			const newItems = items.map((item, inStockIndex) => {
				if (inStockIndex === index) return { ...item, inStock: !item.inStock }
				return item
			})
			setItems(newItems)
		}
	}

	const deleteItem = async (id: any) => {
		const tokenCheck = localStorage.getItem('Token')

		const response = await fetch(
			`http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: tokenCheck as string,
				},
			}
		)

		setAgain(!again)
	}

	const sendEdits = async () => {
		setAdd(false)
		const tokenCheck = localStorage.getItem('Token')

		const response = await fetch(
			`http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: tokenCheck as string,
				},
				body: JSON.stringify({
					category: Number(prefill.category),
					name: prefill.name,
					price: Number(prefill.price),
					inStock: prefill.inStock,
					baseQuantity: prefill.baseQuantity,
					imageId: Number(prefill.imageId),
				}),
			}
		).then((res) => res.json())

		setAgain(!again)
	}

	const allItems = () => {
		// setAll(true)
		// setVege(false)
		// setFruit(false)
		// setOther(false)
		setArr(all)
	}

	const vegeItems = () => {
		// setVege(true)
		// setOther(false)
		// setFruit(false)
		// setAll(false)
		setArr(vege)
	}

	const fruitItems = () => {
		// setFruit(true)
		// setAll(false)
		// setVege(false)
		// setOther(false)
		setArr(fru)
	}

	const otherItems = () => {
		// setOther(true)
		// setAll(false)
		// setVege(false)
		// setFruit(false)
		setArr(other)
	}

	const optionChoose = [
		{ function: allItems, name: 'All Items()' },
		{ function: vegeItems, name: 'Vegetables()' },
		{ function: fruitItems, name: 'Fruits()' },
		{ function: otherItems, name: 'Others()' },
	]

	const headings = [
		{ name: 'Category ID', sxProps: { width: '10vw' } },
		{ name: 'Image' },
		{ name: 'Name', sxProps: { width: '15vw' } },
		{ name: 'BaseQty.', sxProps: { width: '10vw' } },
		{ name: 'Price(Per base Qty.)', sxProps: { width: '15vw' } },
		{ name: 'Instock' },
		{ name: 'Edit' },
		{ name: 'Delete' },
	]

	const formDisplay = [
		{
			label: 'Category',
			value: prefill.category,
			onchange: editFill('category'),
		},
		{
			label: 'Name',
			value: prefill.name,
			onchange: editFill('name'),
		},
		{
			label: 'Price',
			value: prefill.price,
			onchange: editFill('price'),
		},
		{
			label: 'Base Qty.',
			value: prefill.baseQuantity,
			onchange: editFill('baseQuantity'),
		},
		{
			label: 'Image',
			value: prefill.imageId,
			onchange: editFill('imageId'),
		},
	]
	console.log(arr)
	return (
		<>
			<Box
				sx={{
					background:
						'transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box',
				}}>
				{/* ===========================NAVBAR============================= */}
				<Navbar></Navbar>
				{/* ==============================HEADER BAR============================= */}
				<Header></Header>
				{/* ===========================CONTENT BAR===================================== */}
				<Stack
					direction='row'
					spacing={0}
					sx={{
						paddingLeft: '30vw',
						marginTop: '6vh',
						fontSize: 'larger',
						fontWeight: '600',
					}}>
					{optionChoose.map((item, index) => {
						return (
							<Button
								key={index}
								variant='text'
								color='secondary'
								sx={{ fontSize: 'medium', fontWeight: '600' }}
								onClick={item.function}>
								{item.name}
							</Button>
						)
					})}
				</Stack>

				{/* ==============================HEADING/ TITLES==================================== */}

				<Stack
					sx={{
						marginLeft: '9vw',
						marginBottom: '1vh',
						paddingTop: '3vh',
						width: '80vw',
						fontWeight: 'bold',
					}}
					direction='row'
					spacing={2}>
					{headings.map((item, index) => {
						return (
							<Typography
								key={index}
								sx={{
									width: '5vw',
									paddingTop: '2vh',
									fontWeight: 'bold',
									textAlign: 'center',
									...item.sxProps,
								}}>
								{item.name}
							</Typography>
						)
					})}
				</Stack>

				{/* ============================DISPLAY DATA================================ */}

				<Box sx={{ height: '54vh', overflowY: 'scroll' }}>
					{arr.map((item: any, index: number) => {
						return (
							<Stack
								sx={{
									marginLeft: '10vw',
									marginBottom: '1vh',
									borderTop: '1.5px solid white',
									paddingTop: '1vh',
									width: '80vw',
								}}
								key={item.id}
								direction='row'
								spacing={2}>
								<Typography
									sx={{
										width: '10vw',
										paddingTop: '2vh',
										color: '#777777',
										textAlign: 'center',
									}}>
									{' '}
									{item.id}
								</Typography>
								<img width='50vw' height='50vh' src={item.itemImageLinks} />
								<Typography
									sx={{
										width: '15vw',
										paddingTop: '2vh',
										color: '#777777',
										textAlign: 'center',
									}}>
									{' '}
									{item.name}
								</Typography>
								<Typography
									sx={{
										width: '10vw',
										paddingTop: '2vh',
										color: '#777777',
										textAlign: 'center',
									}}>
									{' '}
									{item.baseQuantity}
								</Typography>
								<Typography
									sx={{
										width: '15vw',
										paddingTop: '2vh',
										color: '#777777',
										textAlign: 'center',
									}}>
									{' '}
									{item.price}
								</Typography>
								<Checkbox
									checked={item.inStock}
									sx={{ width: '5vw' }}
									onClick={async (e) => {
										await InstockFills(item, index)
									}}
								/>
								<Button
									variant='text'
									sx={{ width: '5vw' }}
									onClick={(event) => editFills(item)}>
									{' '}
									<EditIcon></EditIcon>
								</Button>
								<Button
									variant='text'
									sx={{ width: '5vw' }}
									onClick={(event) => deleteItem(item.id)}>
									{' '}
									<DeleteIcon></DeleteIcon>
								</Button>
							</Stack>
						)
					})}
				</Box>
			</Box>

			{/* ======================Edit Form=================================== */}
			{add ? (
				<Box
					component='form'
					sx={{
						width: '17vw',
						height: '60vh',
						position: 'absolute',
						top: '18vh',
						left: '50vw',
						padding: '2%',
						BorderAllRounded: '5px',
						backgroundColor: 'white',
						borderRadius: '10px',
					}}
					noValidate
					autoComplete='off'>
					{formDisplay.map((item, index) => {
						return (
							<TextField
								key={index}
								label={item.label}
								variant='standard'
								focused
								value={item.value}
								onChange={item.onchange}
							/>
						)
					})}
					<Button
						variant='contained'
						onClick={sendEdits}
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

export default Dashboard
