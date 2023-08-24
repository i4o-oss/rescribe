import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { REMIX_BASE_PATH, parsePathname } from '@rescribe/core'
import type { Collection, Collections, Config } from '@rescribe/core'
import fg from 'fast-glob'

async function readItemsInCollection(collection: Collection) {
	const { path } = collection
	const fullPath = `${process.cwd()}/${REMIX_BASE_PATH}/${path}.{md,mdx}`
	const entries = await fg(fullPath, { onlyFiles: true })

	return entries
}

type LoaderHandlerArgs = LoaderArgs & {
	config: Config<Collections>
}

export async function handleLoader({ config, request }: LoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parsePathname(url.pathname)
	const { collections } = config

	if (params === null) {
		return json({})
	} else if (params.collection && !params.action) {
		const collection = collections[params.collection]
		const entries = await readItemsInCollection(collection)
		return json({ entries })
	} else if (params.collection && params.action === 'edit') {
		console.log(
			`Editing ${params.slug} from ${params.collection} collection`
		)
		return json({})
	} else {
		return json({})
	}
}
