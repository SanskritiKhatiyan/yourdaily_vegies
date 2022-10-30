import { Components, Theme } from '@mui/material'
import { pxToRem } from '../../utils'

export const minor = (theme: Theme) => {
	const config: Components = {
		MuiButton: {
			defaultProps: {
				variant: 'outlined',
			},
			styleOverrides: {
				sizeSmall: {
					fontSize: pxToRem(14),
				},
			},
		},
		MuiPaper: {
			defaultProps: {
				variant: 'outlined',
			},
		},
		MuiGrid: {
			defaultProps: {
				display: 'flex',
				alignItems: 'stretch',
			},
			styleOverrides: {
				item: {
					flexDirection: 'column',
				},
			},
		},
	}
	return config
}
