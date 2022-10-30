import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material'
import { overrides } from './overrides'
import { palette } from './palette'
import { typography } from './typography'

const baseTheme = (mode: PaletteMode) => ({
	palette: palette(mode),
	typography: {
		fontFamily: [
			`system-ui`,
			`-apple-system`,
			`BlinkMacSystemFont`,
			`'Segoe UI'`,
			`Helvetica`,
			`Arial`,
			`sans-serif`,
			`'Apple Color Emoji'`,
			`'Segoe UI Emoji'`,
			`'Segoe UI Symbol'`,
			'Montserrat',
		].join(','),
	},
	shape: {
		borderRadius: 8,
	},
	mixins: {
		toolbar: {
			minHeight: 64,
		},
	},
})

export const createCustomTheme = (mode: PaletteMode) => {
	let theme = createTheme(baseTheme(mode))
	createTheme({
		components: {},
	})
	theme = createTheme(theme, {
		components: { ...overrides(theme) },
		typography: { ...typography(theme) },
	})

	theme = responsiveFontSizes(theme)
	return theme
}
