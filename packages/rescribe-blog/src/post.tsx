import { Link, useLoaderData } from '@remix-run/react'

import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'

export default function Post({ collection }: { collection: string }) {
	const data = useLoaderData()
	const { content, frontmatter } = data

	return (
		<div className='rs-container rs-max-w-4xl rs-p-6 lg:rs-py-10 lg:rs-px-0'>
			<div className='rs-flex rs-flex-col rs-items-start rs-gap-y-8 rs-px-6'>
				<Link
					to={`/${collection}`}
					className='rs-inline-flex rs-items-center rs-justify-start rs-text-sm rs-gap-2 rs-font-medium rs-no-underline'
					target='_self'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='rs-w-4 rs-h-4'
					>
						<path d='m15 18-6-6 6-6' />
					</svg>
					Back
				</Link>
				<div className='rs-flex rs-flex-1 rs-flex-col rs-items-start rs-justify-start rs-space-y-4'>
					<span className='rs-text-xs rs-font-semibold rs-uppercase rs-text-foreground-subtle'>
						{format(
							// @ts-ignore
							new Date(frontmatter.publishedAt),
							'PPP'
						)}
					</span>
					<h1 className='rs-text-foreground rs-inline-block rs-text-4xl rs-font-extrabold rs-tracking-tight lg:rs-text-5xl'>
						{/* @ts-ignore */}
						{frontmatter.title}
					</h1>
				</div>
			</div>
			<div className='rs-w-full rs-prose dark:rs-prose-invert rs-prose-lg rs-max-w-none rs-px-6 rs-pb-6'>
				<Markdown>{content}</Markdown>
			</div>
		</div>
	)
}
