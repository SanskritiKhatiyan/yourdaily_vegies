import { Components, Theme } from '@mui/material'
import { minor } from './minor'
export const overrides = (theme: Theme) => {
	const overrides: Components = {
		...minor(theme),
	}
	return overrides
}
