import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { BlogLayout } from '@rescribe/blog'
// import { createClient } from '@rescribe/server'
import { configObj as config } from '~/rescribe.config'

export async function loader({ request }: LoaderArgs) {
	// const rescribe = createClient(config)
	// const item = await rescribe.blog.unique({ where: { slug: 'vicimus' } })
	return json({})
}

export default function BlogRoot() {
	return (
		<BlogLayout basePath='/blog' config={config}>
			<div>Blog</div>
		</BlogLayout>
	)
}
