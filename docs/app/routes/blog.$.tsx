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
				<div className='container max-w-4xl p-6 lg:py-10 lg:px-0'>
					<div className='flex h-48 flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8'>
						<div className='flex flex-1 flex-col items-start justify-start space-y-4'>
							<h1 className='text-foreground inline-block text-3xl font-extrabold tracking-tight lg:text-5xl'>
								Blog
							</h1>
							<p className='text-foreground-subtle text-xl'>
								Crafts, product updates, and technical details
							</p>
						</div>
					</div>
					<BlogOutlet />
				</div>
			</div>
			<Footer />
		</>
	)
}
