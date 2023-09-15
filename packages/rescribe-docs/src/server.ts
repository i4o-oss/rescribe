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
		const item = await docs.unique({
			where: { slug: params.slug },
		})
		// TODO: return 404
		if (!item) return json({})

		// @ts-ignore
		const { frontmatter, content } = item
		// TODO: use mdx-bundler and make it work!
		return json({ frontmatter, content })
	}

	// TODO: return an appropriate status code along with an error message
	return json({})
}
