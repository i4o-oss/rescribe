import { BASE_PATH } from './constants'

export function parsePathname(pathname: string) {
	const relativePath = pathname.replace(BASE_PATH, '')
	return relativePath
}
