import { Link } from '@remix-run/react'
import { useContext } from 'react'
import { BASE_PATH } from '../constants'
import { ConfigContext } from '../provider'

export function Dashboard() {
	const { collections } = useContext(ConfigContext)

	return (
		<main className='rs-flex rs-h-full rs-w-full rs-flex-col rs-items-center rs-justify-start rs-py-16 rs-gap-8'>
			<div className='rs-mb-5 rs-flex rs-w-full rs-items-center'>
				<h2 className='rs-mb-1 rs-text-2xl rs-font-bold'>
					Collections
				</h2>
			</div>
			<section className='rs-flex rs-w-full rs-items-center rs-justify-center'>
				<div className='rs-flex rs-w-full rs-flex-wrap rs-items-center'>
					<div className='rs-grid rs-w-full rs-grid-cols-2 rs-gap-4'>
						{Object.keys(collections).map((key) => {
							const collection = collections[key]
							return (
								<Link
									className='rs-border-gray-100 dark:rs-border-gray-800 rs-col-span-1 rs-overflow-hidden rs-rounded-lg rs-border rs-shadow-lg'
									key={key}
									to={`${BASE_PATH}/collections/${collection?.slug}`}
								>
									{/* <img */}
									{/* 	className='w-full' */}
									{/* 	src={`/images/orgs/${index + 1}.svg`} */}
									{/* 	alt='Org Cover' */}
									{/* /> */}
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
		</main>
	)
}