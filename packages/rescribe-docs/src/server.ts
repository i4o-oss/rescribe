import { json } from '@remix-run/node'

import { parseOutputPathname } from '@rescribe/core'

import { DocsLoaderHandlerArgs } from './types'

export async function handleDocsLoader({
	docs,
	request,
}: DocsLoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parseOutputPathname({ pathname: url.pathname })

	if (params?.collection && params.root) {
		const items = await docs.unique({ where: { slug: '_index' } })
		return json({ items })
	} else if (params?.collection && params.slug) {
		// TODO: return type doesn't carry over. fix this.
		const item = await docs.unique({
			where: { slug: params.slug },
		})
		// TODO: return 404
		if (!item) return json({})

		// @ts-ignore
		const { code, frontmatter } = item

		return json({ code, frontmatter })
	}

	// TODO: return an appropriate status code along with an error message
	return json({})
}
