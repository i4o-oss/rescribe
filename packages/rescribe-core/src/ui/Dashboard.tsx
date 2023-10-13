import { Link, useLoaderData } from '@remix-run/react'

import { BASE_PATH } from '../constants'
import type { Collection } from '../types'

type LoaderData = (Collection & {
	itemsCount: number
})[]

export function Dashboard() {
	const collections = useLoaderData<LoaderData>()

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
										className='rs-group rs-relative rs-h-48 rs-border-subtle hover:rs-border-brand hover:rs-shadow-glow rs-col-span-1 rs-overflow-hidden rs-rounded-lg rs-border rs-transition-all rs-duration-200 rs-flex rs-flex-col rs-items-start rs-justify-between rs-gap-4 rs-p-6'
										key={collection.slug}
										prefetch='viewport'
										to={`${BASE_PATH}/collections/${collection.slug}`}
									>
										<span className='rs-absolute rs-top-4 rs-right-4'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
												className='rs-w-8 rs-h-8 rs-text-foreground/10 group-hover:rs-text-brand rs-transition-all rs-duration-200'
											>
												<ellipse
													cx='12'
													cy='5'
													rx='9'
													ry='3'
												/>
												<path d='M3 5V19A9 3 0 0 0 15 21.84' />
												<path d='M21 5V8' />
												<path d='M21 12L18 17H22L19 22' />
												<path d='M3 12A9 3 0 0 0 14.59 14.87' />
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
										<p className='rs-px-4 rs-py-1 cui-bg-ui group-hover:rs-bg-brand/30 rs-rounded-full rs-text-sm'>
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
