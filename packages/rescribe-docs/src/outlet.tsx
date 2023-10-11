import { LinksFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { run } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import { Fragment, HTMLProps, useContext, useEffect, useState } from 'react'
import * as runtime from 'react/jsx-runtime'

import {
	Accordion,
	AccordionGroup,
	Callout,
	Card,
	CardGroup,
	List,
	Tab,
	TabGroup,
} from './components'
import { RescribeDocsContext } from './constants'
import RescribeProvider from './core/provider'
import { Footer, Navbar } from './internal'
import Pagination from './internal/Pagination'
import Sidebar from './internal/sidebar'
import ToC from './internal/toc'
import { RescribeDocsConfig } from './types'

type DocsOutletContext = {
	docsConfig: RescribeDocsConfig
}

type DocsOutletProps = {
	context?: DocsOutletContext
}

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-light.min.css',
		},
		{
			rel: 'stylesheet',
			href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-dark.min.css',
			media: '(prefers-color-scheme: dark)',
		},
	]
}

export default function DocsOutlet({ context }: DocsOutletProps) {
	const docsConfig = useContext(RescribeDocsContext)
	const config = docsConfig ?? context?.docsConfig
	const data = useLoaderData()
	const [mdxModule, setMdxModule] = useState()
	const { code, frontmatter, headings, group } = data
	// @ts-ignore
	const title = frontmatter?.title
	// @ts-ignore
	const groupTitle = group?.title
	// @ts-ignore
	const Content = mdxModule ? mdxModule.default : Fragment

	const components = {
		a: (props: HTMLProps<HTMLAnchorElement>) => (
			<Link to={props?.href || '#'}>{props.children}</Link>
		),
		Accordion: Accordion,
		AccordionGroup: AccordionGroup,
		Callout: Callout,
		Card: Card,
		CardGroup: CardGroup,
		List: List,
		Tab: Tab,
		TabGroup: TabGroup,
	}

	useEffect(() => {
		;(async () => {
			const res = await run(code, runtime)
			setMdxModule(res)
		})()
	}, [code])

	return (
		<RescribeProvider config={config}>
			{config?.navbar ? <Navbar /> : null}
			<div className='rs-relative rs-mx-auto rs-flex rs-w-full rs-max-w-[88rem] rs-justify-between sm:rs-px-2 lg:rs-px-8 xl:rs-px-12'>
				<Sidebar />
				<article className='rs-flex rs-flex-col rs-items-start rs-justify-start rs-px-8 rs-py-16 lg:rs-pr-0 lg:rs-pl-0 xl:rs-px-16 rs-gap-y-4'>
					<span className='rs-text-xs rs-font-semibold rs-uppercase rs-text-brand-500'>
						{groupTitle}
					</span>
					<h1 className='rs-text-foreground rs-inline-block rs-text-4xl rs-font-extrabold rs-tracking-tight lg:rs-text-5xl rs-text-slate-900 dark:rs-text-slate-50'>
						{title}
					</h1>
					<div className='rs-prose dark:rs-prose-invert rs-w-[56rem] [&_h2]:rs-scroll-mt-36 [&_h3]:rs-scroll-mt-36'>
						<MDXProvider components={components}>
							<Content />
						</MDXProvider>
					</div>
					<Pagination />
				</article>
				<ToC headings={headings} />
			</div>
			{config?.footer ? <Footer /> : null}
		</RescribeProvider>
	)
}
