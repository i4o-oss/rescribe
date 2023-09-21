import { Link, useLocation } from '@remix-run/react'

import clsx from 'clsx'

interface HeadingObject {
	depth: number
	properties: { id: string }
	value: string
}

export default function ToC({ headings }: { headings: HeadingObject[] }) {
	const location = useLocation()

	return (
		<div className='rs-relative'>
			<div className='rs-sticky rs-top-20 rs-h-[calc(100vh-10rem)] rs-w-[14rem] xl:rs-flex-none xl:rs-overflow-y-auto rs-py-16'>
				<nav className='rs-flex rs-flex-col rs-gap-4'>
					<h2 className='rs-text-sm rs-font-semibold rs-text-slate-900 dark:rs-text-slate-50'>
						On this page
					</h2>
					<ul className='rs-flex rs-flex-col rs-gap-3'>
						{headings.map(({ depth, value, properties }) => (
							<li
								className={clsx(
									{
										2: 'rs-ml-0',
										3: 'rs-ml-4',
										4: 'rs-ml-8',
										5: 'rs-ml-12',
										6: 'rs-ml-16',
									}[depth as Exclude<typeof depth, 1>],
									'rs-flex rs-flex-col rs-gap-2 rs-text-sm',
									'rs-text-slate-900 dark:rs-text-slate-50'
								)}
								key={properties.id}
							>
								<Link
									className={`-rs-ml-[1px] rs-py-1 rs-text-sm rs-transition-colors rs-duration-300 ${
										location.hash === `#${properties.id}`
											? 'rs-text-brand-500'
											: 'rs-text-gray-700 dark:rs-text-gray-200'
									}`}
									to={`#${properties.id}`}
								>
									{value}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}
