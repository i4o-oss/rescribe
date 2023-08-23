import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { parsePathname } from './helpers'
import type { Collections, Config } from './types'

type LoaderHandlerArgs = LoaderArgs & {
	config: Config<Collections>
}

export function handleLoader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const parsedPath = parsePathname(url.pathname)

	if (parsedPath === null) {
		return json({})
	} else if (parsedPath.collection && !parsedPath.action) {
		console.log(`Fetching items from ${parsedPath.collection} collection`)
		return json({})
	} else if (parsedPath.collection && parsedPath.action === 'edit') {
		console.log(
			`Editing ${parsedPath.slug} from ${parsedPath.collection} collection`
		)
		return json({})
	} else {
		return json({})
	}
}
