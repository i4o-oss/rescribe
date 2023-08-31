import { Link, useLoaderData, useLocation } from '@remix-run/react'

import { PrimaryButton } from '@i4o/catalystui'
import { useContext } from 'react'

import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function CollectionItems() {
	const location = useLocation()
	const collection = useContext<Collection | null>(CollectionContext)
	const { entries } = useLoaderData<{ entries: string[] }>()

	return (
		<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
			<div className='rs-flex rs-h-full rs-w-full rs-max-w-4xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
				<div className='rs-flex rs-w-full rs-items-center rs-justify-between'>
					<h2 className='rs-text-2xl rs-font-bold'>
						{collection?.label || 'Collection'}
					</h2>
					{entries.length > 0 ? (
						<Link to={`${location.pathname}/new`}>
							<PrimaryButton>Add item</PrimaryButton>
						</Link>
					) : null}
				</div>
				<section className='rs-flex rs-w-full rs-items-center rs-justify-center'>
					{entries.length === 0 ? (
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
						<div className='rs-w-full rs-flex rs-flex-col rs-items-start rs-justify-start'>
							{entries.map((item: any, index: number) => (
								<div className='' key={index}>
									{item}
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	)
}
