import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'

import { BlogOutlet } from '@rescribejs/blog'
import type { RescribeBlogConfig } from '@rescribejs/blog/'
import rescribeBlogStylesheet from '@rescribejs/blog/main.css'
import { Footer, Navbar } from '@rescribejs/docs'
import { configObj as config, rescribeDocsConfig } from '~/rescribe.config'
import { handleRescribeBlogLoader } from '~/utils/rescribe.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: rescribeBlogStylesheet },
]

export async function loader(args: LoaderFunctionArgs) {
	return handleRescribeBlogLoader({ ...args, config })
}

export default function BlogRoot() {
	const blogConfig: RescribeBlogConfig = {
		title: 'Blog',
		description: 'Crafts, product updates, and technical details',
	}

	return (
		<>
			<Navbar
				navbarConfig={rescribeDocsConfig.navbar}
				themeConfig={rescribeDocsConfig.theme}
			/>
			<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col mx-auto max-w-4xl justify-start items-center'>
				<BlogOutlet context={{ blogConfig }} />
			</div>
			<Footer footerConfig={rescribeDocsConfig.footer} />
		</>
	)
}
