import { useContext } from 'react'
import invariant from 'tiny-invariant'

import { BASE_PATH } from '../constants'
import { RescribeContext } from '../providers'
import type { Collection, RescribeData } from '../types'

type LoaderData = (Collection & {
	itemsCount: number
})[]

export function Dashboard() {
	const context = useContext<RescribeData | undefined>(RescribeContext)
	invariant(context?.data, 'Loader Data cannot be undefined')
	invariant(context?.Link, 'Link is null')

	const Link = context.Link
	const collections = context.data as LoaderData

	return (
		<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
			<div className='rs-flex rs-h-full rs-w-full rs-max-w-4xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
				<div className='rs-flex rs-w-full rs-items-center'>
					<h2 className='rs-text-2xl rs-font-bold'>Collections</h2>
				</div>
				<section className='rs-flex rs-w-full rs-items-center rs-justify-center'>
					<div className='rs-flex rs-w-full rs-flex-wrap rs-items-center'>
						<div className='rs-grid rs-w-full rs-grid-cols-2 rs-gap-4'>
							{collections.map((collection) => {
								return (
									<Link
										className='rs-group rs-relative rs-h-48 rs-border-subtle hover:rs-border-brand hover:rs-shadow-[0_0_1rem_-0.35rem_#2cb67d] rs-col-span-1 rs-overflow-hidden rs-rounded-lg rs-border rs-transition-all rs-duration-200 rs-flex rs-flex-col rs-items-start rs-justify-between rs-gap-4 rs-p-6'
										key={collection.slug}
										to={`${BASE_PATH}/collections/${collection.slug}`}
									>
										<span className='rs-absolute -rs-top-8 -rs-right-8'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='1'
												strokeLinecap='round'
												strokeLinejoin='round'
												className='rs-w-32 rs-h-32 rs-text-foreground/5 group-hover:rs-text-brand/20 rs-transition-all rs-duration-200 group-hover:rs-scale-125'
											>
												<path d='M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z' />
												<path d='m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z' />
												<path d='M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z' />
												<path d='m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z' />
											</svg>
										</span>
										<div className='rs-flex rs-flex-col rs-items-start rs-gap-2'>
											<h3 className='rs-text-xl rs-font-medium'>
												{collection?.label}
											</h3>
											<p className='rs-text-sm rs-text-foreground-subtle'>
												{collection.path}
											</p>
										</div>
										<p className='rs-px-4 rs-py-1 cui-bg-ui rs-rounded-full rs-text-sm'>
											{`${collection.itemsCount} items`}
										</p>
									</Link>
								)
							})}
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
