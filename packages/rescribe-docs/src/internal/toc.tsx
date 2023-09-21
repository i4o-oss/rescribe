import { Link, useLocation } from '@remix-run/react'

import cn from 'clsx'
import { useContext } from 'react'

import { RescribeDataContext } from '../constants'

export default function ToC() {
	const location = useLocation()
	// TODO: fix the types here
	// const { headings } = useContext(RescribeDataContext)

	return (
		<div className='rs-relative'>
			<div className='rs-sticky rs-top-20 rs-h-[calc(100vh-10rem)] rs-min-w-[14rem] xl:rs-flex-none xl:rs-overflow-y-auto xl:rs-py-8'>
				<nav className='rs-flex rs-flex-col rs-gap-4'>
					<h2 className='rs-text-sm rs-font-semibold rs-text-slate-900 dark:rs-text-slate-50'>
						On this page
					</h2>
					<ul className='rs-flex rs-flex-col rs-gap-3'>
						{/*{headings.map(({ depth, value, properties }) => (*/}
						{/*	<li*/}
						{/*		className={cn(*/}
						{/*			{*/}
						{/*				2: 'ml-0',*/}
						{/*				3: 'ml-4',*/}
						{/*				4: 'ml-8',*/}
						{/*				5: 'ml-12',*/}
						{/*				6: 'ml-16',*/}
						{/*			}[depth as Exclude<typeof depth, 1>],*/}
						{/*			'flex flex-col gap-2 text-sm',*/}
						{/*			'text-slate-900 dark:text-slate-50'*/}
						{/*		)}*/}
						{/*		key={properties.id}*/}
						{/*	>*/}
						{/*		<Link*/}
						{/*			className={`-ml-[1px] py-1 text-sm transition-colors duration-300 ${*/}
						{/*				location.hash === `#${properties.id}`*/}
						{/*					? 'text-brand-500'*/}
						{/*					: 'text-gray-700 dark:text-gray-200'*/}
						{/*			}`}*/}
						{/*			to={`#${properties.id}`}*/}
						{/*		>*/}
						{/*			{value}*/}
						{/*		</Link>*/}
						{/*	</li>*/}
						{/*))}*/}
					</ul>
				</nav>
			</div>
		</div>
	)
}
