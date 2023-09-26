import { json } from '@remix-run/node'

import { parseOutputPathname } from '@rescribejs/core'

import { DocsLoaderHandlerArgs } from './types'

export async function handleDocsLoader({
	docs,
	docsConfig,
	request,
}: DocsLoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parseOutputPathname({ pathname: url.pathname })

	if (params?.collection) {
		const links = docsConfig.sidebar.navigation[params.collection]
		if (params.root) {
			const [group] = links.filter((group) =>
				group.pages.hasOwnProperty('index' || '_index')
			)
			const item = await docs.unique({
				where: { slug: '_index' },
				options: { headings: true },
			})
			// TODO: return 404
			if (!item) return json({})

			// @ts-ignore
			const { code, frontmatter, headings } = item

			return json({ code, frontmatter, headings, group })
		} else if (params.slug) {
			const [group] = links.filter((group) =>
				group.pages.hasOwnProperty(params.slug)
			)
			// TODO: return type doesn't carry over. fix this.
			const item = await docs.unique({
				where: { slug: params.slug },
				options: { headings: true },
			})
			// TODO: return 404
			if (!item) return json({})

			// @ts-ignore
			const { code, frontmatter, headings } = item

			return json({ code, frontmatter, headings, group })
		}
	}

	// TODO: return an appropriate status code along with an error message
	return json({})
}
