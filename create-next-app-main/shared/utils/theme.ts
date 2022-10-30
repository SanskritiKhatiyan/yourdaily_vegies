/**
 *
 * @param px
 * @param baseNumber
 * @returns string of number converted to rem
 */
export function pxToRem(px: number, baseNumber: number = 16) {
	return `${px / baseNumber}rem`
}
