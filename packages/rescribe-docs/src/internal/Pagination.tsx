import { Link, useLocation } from '@remix-run/react'

import { useContext, useEffect, useState } from 'react'

import { RescribeDocsContext } from '../constants'
import { getPrevAndNextPages } from '../helpers'
import { NavigationLink, NavigationLinkGroup, PaginationLink } from '../types'

export default function Pagination() {
	const context = useContext(RescribeDocsContext)
	const sidebar = context?.sidebar
	const location = useLocation()
	const params = location.pathname.split('/')
	const root = params[1]
	const [prevPage, setPrevPage] = useState<PaginationLink | null>()
	const [nextPage, setNextPage] = useState<PaginationLink | null>()
	// TODO: fix this type later
	const navigationOptions = sidebar?.navigation[root] as NavigationLinkGroup[]
	const allPages: Record<string, NavigationLink> = navigationOptions.reduce(
		(acc, curr) => Object.assign(acc, curr.pages),
		{}
	)

	useEffect(() => {
		const { nextPage, prevPage } = getPrevAndNextPages(allPages, root)

		setPrevPage(prevPage)
		setNextPage(nextPage)
	}, [location])

	return (
		<>
			<hr className='rs-w-full rs-my-2 rs-bg-foreground-subtle rs-opacity-30' />
			<div className='rs-w-full rs-h-16 rs-flex rs-items-center rs-justify-start rs-gap-4'>
				{prevPage ? (
					<Link
						className='rs-w-full rs-h-full rs-p-4 rs-flex rs-items-center rs-justify-start rs-border rs-border-foreground-subtle/30 rs-rounded-lg rs-gap-2 rs-text-foreground-subtle'
						to={
							prevPage.link === 'index' ||
							prevPage.link === '_index'
								? `/${root}`
								: `/${root}/${prevPage?.link}`
						}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
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
						{prevPage?.title}
					</Link>
				) : null}
				{nextPage ? (
					<Link
						className='rs-w-full rs-h-full rs-p-4 rs-flex rs-items-center rs-justify-end rs-border rs-border-foreground-subtle/30 rs-rounded-lg rs-gap-2 rs-text-foreground-subtle'
						to={`/${root}/${nextPage?.link}`}
					>
						{nextPage?.title}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='rs-w-4 rs-h-4'
						>
							<path d='m9 18 6-6-6-6' />
						</svg>
					</Link>
				) : null}
			</div>
		</>
	)
}
