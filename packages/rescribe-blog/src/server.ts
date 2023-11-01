import { json } from '@remix-run/server-runtime'

import { parseOutputPathname } from '@rescribejs/core'

// import rehypeHighlight from 'rehype-highlight'
import type { BlogLoaderHandlerArgs } from './types'

// TODO: it would be better if collection interface can be created here instead of asking the user to create it and pass it to the handler
export async function handleBlogLoader({
	blog,
	request,
}: BlogLoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parseOutputPathname({ pathname: url.pathname })

	if (params?.collection && params.root) {
		const items = await blog.all({ filter: { published: true } })
		return json({ items })
	} else if (params?.collection && params.slug) {
		const item = await blog.unique({
			where: { slug: params.slug },
		})
		if (!item) return json({})

		// @ts-ignore
		const { frontmatter, content } = item
		// TODO: use mdx-bundler and make it work!
		return json({ frontmatter, content })
	}

	return json({})
}
