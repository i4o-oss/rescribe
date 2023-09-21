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
	const { content, frontmatter } = data

	return (
		<RescribeProvider config={config}>
			{config?.navbar ? <Navbar /> : null}
			<div className='rs-relative rs-mx-auto rs-flex rs-min-h-[calc(100vh-10rem)] rs-w-full rs-max-w-[88rem] rs-justify-between sm:rs-px-2 lg:rs-px-8 xl:rs-px-12'>
				<Sidebar />
				<span className='rs-text-xs rs-font-semibold rs-uppercase rs-text-foreground-subtle'>
					Overview
				</span>
				<h1 className='rs-text-foreground rs-inline-block rs-text-4xl rs-font-extrabold rs-tracking-tight lg:rs-text-5xl'>
					{/* @ts-ignore */}
					{frontmatter?.title}
				</h1>
				<div className='rs-prose dark:rs-prose-invert rs-max-w-4xl rs-flex-auto rs-px-8 rs-pt-8 rs-pb-16 lg:rs-pr-0 lg:rs-pl-0 xl:rs-px-16 [&_h2]:rs-scroll-mt-36 [&_h3]:rs-scroll-mt-36'>
					<Markdown>{content}</Markdown>
				</div>
				<ToC />
			</div>
			{config?.footer ? <Footer /> : null}
		</RescribeProvider>
	)
}
