import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { parsePathname } from './helpers'

export function handleLoader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const pathname = parsePathname(url.pathname)

	if (pathname === '') {
		console.log('root')
		return json({})
	} else if (pathname.startsWith('/collections')) {
		const collectionSlug = pathname.replace('/collections/', '')
		console.log(`Fetching items from ${collectionSlug} collection`)
		return json({})
	} else {
		return json({})
	}
}
