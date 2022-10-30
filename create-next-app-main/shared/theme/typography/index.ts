import { Theme } from '@mui/material'
import { pxToRem } from '../../utils'

export const typography = (theme: Theme) => {
	return {
		fontSize: 16,
		h1: {
			fontSize: pxToRem(28),
			fontWeight: 700,
		},
		h2: {
			fontSize: pxToRem(24),
			fontWeight: 700,
		},
		h3: {
			fontSize: pxToRem(20),
			fontWeight: 700,
			letterSpacing: 0,
		},
		h4: {
			fontSize: pxToRem(18),
			fontWeight: 500,
		},
		h5: {
			fontSize: pxToRem(16),
			fontWeight: 700,
			lineHeight: 1.3,
		},
		h6: {
			fontSize: pxToRem(16),
			fontWeight: 600,
			lineHeight: 1.3,
		},
		subtitle1: {
			fontSize: pxToRem(16),
			fontWeight: 500,
		},
		subtitle2: {
			fontSize: pxToRem(16),
			fontWeight: 400,
		},
		body1: {
			fontSize: pxToRem(16),
			fontWeight: 400,
			lineHeight: 1.3,
		},
		body2: {
			fontSize: pxToRem(12),
			fontWeight: 400,
			lineHeight: 1.2,
		},
		button: {
			fontSize: pxToRem(16),
			fontWeight: 700,
		},
		caption: {
			fontSize: pxToRem(12),
			fontWeight: 300,
		},
		overline: {
			fontSize: pxToRem(14),
		},
	}
}
