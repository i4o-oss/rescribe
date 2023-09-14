import { json } from '@remix-run/node'

import { parseOutputPathname } from '@rescribe/core'

import { DocsLoaderHandlerArgs } from './types'

export async function handleDocsLoader({ request }: DocsLoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parseOutputPathname({ pathname: url.pathname })

	// TODO send proper loader data based on params

	return json({})
}
