import { BASE_PATH_REGEX } from './constants'

export function parseAdminPathname({
	basePath = BASE_PATH_REGEX,
	pathname,
}: {
	basePath?: string | RegExp
	pathname: string
}) {
	const replaced = pathname.replace(basePath, '')
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

export function parseOutputPathname({
	basePath,
	pathname,
}: {
	basePath: string | RegExp
	pathname: string
}) {
	const replaced = pathname.replace(basePath, '')
	const parts =
		replaced === '' ? [] : replaced.split('/').map(decodeURIComponent)

	if (parts.length === 0) {
		return { root: true }
	}
}
