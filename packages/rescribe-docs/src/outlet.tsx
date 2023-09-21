import { useLoaderData } from '@remix-run/react'

import Markdown from 'markdown-to-jsx'
import { useContext } from 'react'

import { RescribeDocsContext } from './constants'
import RescribeProvider from './core/provider'
import { Footer, Navbar } from './internal'
import Sidebar from './internal/sidebar'
import ToC from './internal/toc'
import { RescribeDocsConfig } from './types'

type DocsOutletContext = {
	docsConfig: RescribeDocsConfig
}

type DocsOutletProps = {
	context?: DocsOutletContext
}

export default function DocsOutlet({ context }: DocsOutletProps) {
	const docsConfig = useContext(RescribeDocsContext)
	const config = docsConfig ?? context?.docsConfig
	const data = useLoaderData()
	const { content, frontmatter, headings, group } = data
	// @ts-ignore
	const title = frontmatter?.title
	// @ts-ignore
	const groupTitle = group?.title

	return (
		<RescribeProvider config={config}>
			{config?.navbar ? <Navbar /> : null}
			<div className='rs-relative rs-mx-auto rs-flex rs-min-h-[calc(100vh-10rem)] rs-w-full rs-max-w-[88rem] rs-justify-between sm:rs-px-2 lg:rs-px-8 xl:rs-px-12'>
				<Sidebar />
				<article className='rs-flex rs-flex-col rs-items-start rs-justify-start rs-px-8 rs-py-16 lg:rs-pr-0 lg:rs-pl-0 xl:rs-px-16 rs-gap-y-4'>
					<span className='rs-text-xs rs-font-semibold rs-uppercase rs-text-brand-500'>
						{groupTitle}
					</span>
					<h1 className='rs-text-foreground rs-inline-block rs-text-4xl rs-font-extrabold rs-tracking-tight lg:rs-text-5xl rs-text-slate-900 dark:rs-text-slate-50'>
						{title}
					</h1>
					<div className='rs-prose dark:rs-prose-invert rs-w-[56rem] rs-flex-auto [&_h2]:rs-scroll-mt-36 [&_h3]:rs-scroll-mt-36'>
						<Markdown>{content}</Markdown>
					</div>
				</article>
				<ToC headings={headings} />
			</div>
			{config?.footer ? <Footer /> : null}
		</RescribeProvider>
	)
}
