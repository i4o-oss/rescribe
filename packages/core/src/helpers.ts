import { BASE_PATH_REGEX } from './constants'

export function parsePathname(pathname: string) {
	const replaced = pathname.replace(BASE_PATH_REGEX, '')
	const parts =
		replaced === '' ? [] : replaced.split('/').map(decodeURIComponent)

	if (parts.length === 0) {
		return { root: true }
	}

	if (parts.length < 2 || parts[0] !== 'collections') return null

	const collection = parts[1]
	if (parts.length === 2) {
		return { collection }
	}
	if (parts.length === 3 && parts[2] === 'new') {
		return { collection, action: 'create' as const }
	}
	if (parts.length === 3 && parts[2] !== 'new') {
		const slug = parts[2]
		return { collection, action: 'edit' as const, slug }
	}

	return null
}
