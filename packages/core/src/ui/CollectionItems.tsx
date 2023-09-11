import { Link, useLoaderData, useLocation } from '@remix-run/react'

import { PrimaryButton } from '@i4o/catalystui'
import { format, formatDistance } from 'date-fns'
import { useContext } from 'react'

import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function CollectionItems() {
	const location = useLocation()
	const collection = useContext<Collection | null>(CollectionContext)
	const { items } = useLoaderData()

	return (
		<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
			<div className='rs-flex rs-h-full rs-w-full rs-max-w-4xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
				<div className='rs-flex rs-w-full rs-items-center rs-justify-between rs-px-4'>
					<h2 className='rs-text-2xl rs-font-bold'>
						{collection?.label || 'Collection'}
					</h2>
					{items.length > 0 ? (
						<Link to={`${location.pathname}/new`}>
							<PrimaryButton>Add item</PrimaryButton>
						</Link>
					) : null}
				</div>
				<section className='rs-flex rs-flex-col rs-items-start rs-justify-start rs-w-full rs-px-4'>
					{items.length === 0 ? (
						<div className='rs-w-full rs-flex rs-items-center rs-justify-center rs-border rs-border-subtle rs-rounded-lg rs-px-8 rs-py-16'>
							<div className='rs-w-full rs-max-w-[60%] rs-flex rs-flex-col rs-items-center rs-justify-center rs-text-center rs-gap-2'>
								<span className='rs-mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='rs-w-20 rs-h-20 rs-text-brand/50'
									>
										<path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
										<polyline points='14 2 14 8 20 8' />
										<line x1='12' x2='12' y1='18' y2='12' />
										<line x1='9' x2='15' y1='15' y2='15' />
									</svg>
								</span>
								<h3 className='rs-text-lg rs-font-semibold'>
									{collection?.label
										? `You don't have content in the ${collection?.label} collection yet`
										: "You don't have content in this collection yet"}
								</h3>
								<p className='rs-text-sm rs-max-w-[80%] rs-text-foreground-subtle'>
									Create a new item in this collection by
									clicking the button below
								</p>
								<Link
									className='rs-mt-8'
									to={`${location.pathname}/new`}
								>
									<PrimaryButton>Add item</PrimaryButton>
								</Link>
							</div>
						</div>
					) : (
						<>
							<div className='rs-col-span-2 rs-px-4 rs-grid rs-h-16 rs-w-full rs-grid-cols-3 rs-gap-4 rs-bg-transparent rs-border-b rs-border-subtle'>
								<span className='rs-col-span-2 rs-text-lg rs-flex rs-items-center rs-justify-start rs-text-foreground-subtle rs-font-medium'>
									Title
								</span>
								<span className='rs-flex rs-text-lg rs-items-center rs-justify-start rs-text-foreground-subtle rs-font-medium'>
									Created
								</span>
							</div>
							<div className='rs-w-full rs-flex rs-flex-col rs-items-start rs-justify-center rs-divide-y rs-divide-gray-200 dark:rs-divide-gray-700'>
								{items.map((item: any) => (
									<Link
										className='rs-col-span-2 rs-px-4 rs-grid rs-h-16 rs-w-full rs-grid-cols-3 rs-gap-4 rs-bg-transparent hover:rs-bg-brand/30'
										key={item.frontmatter.slug}
										to={`${location.pathname}/${item.frontmatter.slug}`}
									>
										<div className='rs-col-span-2 rs-flex rs-items-center rs-justify-start'>
											<h3 className='rs-text-foreground rs-font-medium rs-text-left'>
												{item.frontmatter.title}
											</h3>
										</div>
										<div className='rs-flex rs-items-center rs-justify-start rs-space-x-2'>
											<span
												className='rs-text-foreground-subtle rs-text-xs'
												title={format(
													new Date(
														item.frontmatter.createdAt
													),
													'PPPp'
												)}
											>
												{formatDistance(
													new Date(
														item.frontmatter.createdAt
													),
													new Date(),
													{
														addSuffix: true,
													}
												)}
											</span>
										</div>
									</Link>
								))}
							</div>
						</>
					)}
				</section>
			</div>
		</main>
	)
}
