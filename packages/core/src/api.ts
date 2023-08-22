import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

export function handleLoader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const basePath = '/rescribe'
	const pathname = url.pathname.replace(basePath, '')
	switch (pathname) {
		case '/test': {
			console.log('test')
			return json({})
		}
		default: {
			console.log('root')
			return json({})
		}
	}
}
