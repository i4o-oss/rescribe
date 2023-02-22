import { useContext } from 'react'
import { Link, useLocation } from '@remix-run/react'
import { RescribeContext } from '../constants'
import { SidebarLink } from '../types'

function Sidebar() {
	const config = useContext(RescribeContext)
	const location = useLocation()

	return (
		<div className='relative'>
			<div className='sticky top-20 h-[calc(100vh-5rem)] min-w-[20rem] space-y-4 overflow-y-auto overflow-x-hidden border-r border-gray-200 py-8 pr-4 pl-1 dark:border-gray-800'>
				{config.sidebar?.search ? (
					<input
						className='h-12 w-full rounded-md bg-neutral-100 px-4 py-1 text-sm text-gray-500 dark:bg-neutral-900 dark:text-gray-300'
						placeholder='Search...'
					/>
				) : null}
				{config.sidebar?.links && (
					<ul className='flex flex-col space-y-4'>
						{config.sidebar?.links?.map(
							(link: SidebarLink, index: number) => {
								return (
									<li key={index}>
										{link?.external ? (
											<a
												className='group flex items-center gap-4 text-gray-400 transition-all duration-300 dark:text-gray-600'
												href={link.href}
												target='_blank'
												rel='noreferrer noopener'
											>
												<div className='group-hover:bg-brand-500 group-hover:dark:bg-brand-500 rounded-md p-1 ring-1 ring-zinc-400/25 group-hover:text-white dark:ring-zinc-700/40 group-hover:dark:text-white'>
													{link.icon}
												</div>
												<span className='text-sm font-semibold'>
													{link.label}
												</span>
											</a>
										) : (
											<Link
												className='group flex items-center gap-4 text-gray-400 transition-all duration-300 dark:text-gray-600'
												to={link.href}
											>
												<div
													className={`group-hover:bg-brand-500 group-hover:dark:bg-brand-500 rounded-md p-1 ring-1 ring-zinc-400/25 group-hover:text-white dark:ring-zinc-700/40 group-hover:dark:text-white ${
														link.href ===
														location.pathname
															? 'bg-brand-500 text-white'
															: ''
													}`}
												>
													{link.icon}
												</div>
												<span
													className={`text-sm font-semibold ${
														link.href ===
														location.pathname
															? 'text-brand-500'
															: ''
													}`}
												>
													{link.label}
												</span>
											</Link>
										)}
									</li>
								)
							}
						)}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Sidebar
