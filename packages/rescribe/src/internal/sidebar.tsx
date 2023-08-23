import { RescribeContext } from '../constants'
import type { SidebarLink } from '../types'
import { Link, useLocation } from '@remix-run/react'
import { useContext } from 'react'

function Sidebar() {
	const { sidebar } = useContext(RescribeContext)
	const location = useLocation()
	const [, root, , _] = location.pathname.split('/')
	// TODO: Fix this type later
	const navigationOptions = sidebar?.navigation[root] as Array<any>

	return (
		<div className='relative'>
			<div className='sticky top-20 flex h-[calc(100vh-10rem)] min-w-[16rem] flex-col gap-8 overflow-y-auto overflow-x-hidden py-8 pr-4 pl-1'>
				{sidebar?.search ? (
					<input
						className='h-12 w-full rounded-md bg-neutral-100 px-4 py-1 text-sm text-gray-500 dark:bg-neutral-900 dark:text-gray-300'
						placeholder='Search...'
					/>
				) : null}
				{sidebar?.links && (
					<ul className='flex flex-col gap-4'>
						{sidebar?.links?.map(
							(link: SidebarLink, index: number) => {
								return (
									<li key={index}>
										{link?.external ? (
											<a
												className='group flex items-center gap-4 text-gray-400 dark:text-gray-600'
												href={link.href}
												target='_blank'
												rel='noreferrer noopener'
											>
												<div className='group-hover:bg-brand-500 group-hover:dark:bg-brand-500 rounded-md p-1 ring-1 ring-zinc-400/25 transition-all duration-300 group-hover:text-white dark:ring-zinc-700/40 group-hover:dark:text-white '>
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
															location.pathname ||
														location.pathname.startsWith(
															link.href
														)
															? 'bg-brand-500 text-white'
															: ''
													} transition-all duration-300 `}
												>
													{link.icon}
												</div>
												<span
													className={`text-sm font-semibold ${
														link.href ===
															location.pathname ||
														location.pathname.startsWith(
															link.href
														)
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
				<ul className='flex flex-col gap-8'>
					{navigationOptions?.map(
						(option: Record<string, unknown>, index: number) => (
							<li className='flex flex-col' key={index}>
								<h5 className='mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200'>
									{option.group as string}
								</h5>
								<ul className='flex flex-col gap-2 border-l border-gray-100 dark:border-gray-800'>
									{Object.keys(option.pages).map(
										(page: string, j: number) => {
											if (
												page === 'index' ||
												page === '_index'
											) {
												return (
													<Link
														to={`/${root}`}
														className={`-ml-[1px] border-l py-1 pl-4 text-sm transition-colors duration-300 ${
															location.pathname ===
															`/${root}`
																? 'border-brand-500 text-brand-500'
																: 'hover:border-brand-500 hover:dark:border-brand-500 border-transparent text-gray-700 dark:text-gray-200'
														}`}
														key={j}
													>
														{option.pages[page]}
													</Link>
												)
											}

											return (
												<Link
													to={page}
													className={`-ml-[1px] border-l py-1 pl-4 text-sm transition-colors duration-300 ${
														location.pathname ===
														`/${root}/${page}`
															? 'border-brand-500 text-brand-500'
															: 'hover:border-brand-500 hover:dark:border-brand-500 hover:text-brand-500 hover:dark:text-brand-500 border-transparent text-gray-700 dark:text-gray-200'
													}`}
													key={j}
												>
													{option.pages[page]}
												</Link>
											)
										}
									)}
								</ul>
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
