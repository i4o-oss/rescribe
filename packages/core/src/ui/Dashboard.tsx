import { Link } from '@remix-run/react'

import { useContext } from 'react'

import { BASE_PATH } from '../constants'
import { ConfigContext } from '../providers'

export function Dashboard() {
	const { collections } = useContext(ConfigContext)

	return (
		<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
			<div className='rs-flex rs-h-full rs-w-full rs-max-w-4xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
				<div className='rs-flex rs-w-full rs-items-center'>
					<h2 className='rs-text-2xl rs-font-bold'>Collections</h2>
				</div>
				<section className='rs-flex rs-w-full rs-items-center rs-justify-center'>
					<div className='rs-flex rs-w-full rs-flex-wrap rs-items-center'>
						<div className='rs-grid rs-w-full rs-grid-cols-2 rs-gap-4'>
							{Object.keys(collections).map((key) => {
								const collection = collections[key]
								return (
									<Link
										className='rs-border-gray-100 dark:rs-border-gray-800 hover:rs-border-gray-200 hover:dark:rs-border-gray-800 rs-col-span-1 rs-overflow-hidden rs-rounded-lg rs-border rs-shadow-lg rs-transition-all rs-duration-200'
										key={key}
										to={`${BASE_PATH}/collections/${collection?.slug}`}
									>
										<div className='rs-flex rs-flex-col rs-items-start rs-justify-center rs-gap-4 rs-px-6 rs-py-4'>
											<div className='rs-text-lg rs-font-medium'>
												{collection?.label}
											</div>
										</div>
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
