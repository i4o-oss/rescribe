import { useLoaderData } from '@remix-run/react'

import Markdown from 'markdown-to-jsx'
import { useContext, useMemo } from 'react'

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
	// const Content = useMemo(() => getMDXComponent(code), [code])

	return (
		<RescribeProvider config={config}>
			{config?.navbar ? <Navbar /> : null}
			<div className='relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[88rem] justify-between sm:px-2 lg:px-8 xl:px-12'>
				<Sidebar />
				<div className='prose dark:prose-invert max-w-4xl flex-auto px-4 py-16 lg:pr-0 lg:pl-0 xl:px-16 [&_h2]:scroll-mt-36 [&_h3]:scroll-mt-36'>
					<Markdown>{content}</Markdown>
				</div>
				<ToC />
			</div>
			{config?.footer ? <Footer /> : null}
		</RescribeProvider>
	)
}
