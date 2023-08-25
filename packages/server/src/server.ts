import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { parsePathname } from '@rescribe/core'
import type { Collections, Config } from '@rescribe/core'
import { zx } from 'zodix'

import { generateZodSchema, readItemsInCollection } from './helpers'

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

type ActionHandlerArgs = ActionArgs & {
	config: Config<Collections>
}

export async function handleAction({ config, request }: ActionHandlerArgs) {
	const url = new URL(request.url)
	const params = parsePathname(url.pathname)
	const { collections } = config

	if (params?.collection) {
		const collection = collections[params.collection]
		const formDataSchema = generateZodSchema(collection.schema)
		const formData = await zx.parseForm(request, formDataSchema)

		console.log(formData)
	}

	return json({})
}
