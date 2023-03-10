import { Link } from '@remix-run/react'
import { useContext } from 'react'
import cn from 'clsx'
import { RescribeDataContext } from '../constants'

export default function ToC() {
	// TODO: Fix the types here
	const { headings } = useContext(RescribeDataContext)

	return (
		<div className='relative'>
			<div className='sticky top-20 h-[calc(100vh-10rem)] min-w-[14rem] xl:flex-none xl:overflow-y-auto xl:py-8'>
				<nav className='flex flex-col gap-4'>
					<h2 className='text-sm font-semibold text-slate-900 dark:text-slate-50'>
						On this page
					</h2>
					<ul className='flex flex-col gap-3'>
						{headings.map(({ depth, value, properties }) => (
							<li
								className={cn(
									{
										2: 'ml-0',
										3: 'ml-4',
										4: 'ml-8',
										5: 'ml-12',
										6: 'ml-16',
									}[depth as Exclude<typeof depth, 1>],
									'flex flex-col gap-2 text-sm',
									'text-slate-900 dark:text-slate-50'
								)}
								key={properties.id}
							>
								<Link to={`#${properties.id}`}>{value}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}
