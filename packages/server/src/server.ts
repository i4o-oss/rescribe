import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import fg from 'fast-glob'
import { parsePathname, REMIX_BASE_PATH } from '@rescribe/core'
import type { Collection, Collections, Config } from '@rescribe/core'

async function readItemsInCollection(collection: Collection) {
	const { path } = collection
	const fullPath = `${process.cwd()}/${REMIX_BASE_PATH}/${path}.{md,mdx}`
	const entries = await fg(fullPath, { onlyFiles: true })

	console.log(entries)
	return entries
}

type LoaderHandlerArgs = LoaderArgs & {
	config: Config<Collections>
}

export async function handleLoader({ config, request }: LoaderHandlerArgs) {
	const url = new URL(request.url)
	const parsedPath = parsePathname(url.pathname)
	const { collections } = config

	if (parsedPath === null) {
		return json({})
	} else if (parsedPath.collection && !parsedPath.action) {
		const collection = collections[parsedPath.collection]
		const entries = await readItemsInCollection(collection)
		return json({ entries })
	} else if (parsedPath.collection && parsedPath.action === 'edit') {
		console.log(
			`Editing ${parsedPath.slug} from ${parsedPath.collection} collection`
		)
		return json({})
	} else {
		return json({})
	}
}
