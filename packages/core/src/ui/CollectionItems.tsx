import { Link, useLoaderData, useLocation } from '@remix-run/react'

import { PrimaryButton } from '@i4o/catalystui'

export default function CollectionItems() {
	const { entries } = useLoaderData()
	const location = useLocation()

	return (
		<main className='rs-flex rs-h-full rs-w-full rs-flex-col rs-items-center rs-justify-start rs-gap-12'>
			<div className='rs-flex rs-w-full rs-items-center rs-justify-between'>
				<h2 className='rs-text-2xl rs-font-bold'>Collections</h2>
				{entries.length > 0 ? (
					<Link to={`${location.pathname}/new`}>
						<PrimaryButton>New</PrimaryButton>
					</Link>
				) : null}
			</div>
			<section className='rs-flex rs-w-full rs-items-center rs-justify-center'>
				{entries.length === 0 ? (
					<div className='rs-w-full rs-flex rs-items-center rs-justify-center rs-border rs-border-gray-100 dark:rs-border-gray-800 rs-rounded-lg rs-px-8 rs-py-16'>
						<div className='rs-w-full rs-max-w-[60%] rs-flex rs-flex-col rs-items-center rs-justify-center rs-text-center rs-gap-2'>
							<h3 className='rs-text-lg rs-font-semibold'>
								You don't have content in this collection yet
							</h3>
							<p className='rs-text-sm rs-max-w-[80%]'>
								Create a new item in this collection by clicking
								the button below
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
						{entries.map((item: any) => (
							<div className='' key={item.slug}>
								Collection Items
							</div>
						))}
					</div>
				)}
			</section>
		</main>
	)
}
