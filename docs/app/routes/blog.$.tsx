import type { LinksFunction, LoaderArgs } from '@remix-run/node'

import { Footer, Navbar } from '@i4o/rescribe'
import { BlogOutlet } from '@rescribe/blog'
import rescribeBlogStylesheet from '@rescribe/blog/main.css'
import { configObj as config } from '~/rescribe.config'
import { handleRescribeBlogLoader } from '~/utils/rescribe.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: rescribeBlogStylesheet },
]

export async function loader(args: LoaderArgs) {
	return handleRescribeBlogLoader({ ...args, config })
}

export default function BlogRoot() {
	return (
		<>
			<Navbar />
			<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col mx-auto max-w-4xl justify-start items-center'>
				<BlogOutlet />
			</div>
			<Footer />
		</>
	)
}
