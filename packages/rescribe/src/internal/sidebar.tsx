import { useContext } from 'react'
import { Link, useLocation } from '@remix-run/react'
import { RescribeContext } from '../constants'
import { SidebarLink } from '../types'

function Sidebar() {
	const { sidebar } = useContext(RescribeContext)
	const location = useLocation()
	const [, root] = location.pathname.split('/')
	// TODO: Fix this type later
	const navigationOptions = sidebar?.navigation[root] as Array<any>
	console.log(navigationOptions)

	return (
		<div className='relative'>
			<div className='sticky top-20 flex h-[calc(100vh-10rem)] min-w-[20rem] flex-col gap-8 overflow-y-auto overflow-x-hidden py-8 pr-4 pl-1'>
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
												<span className='font-semibold'>
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
													} transition-all duration-300 `}
												>
													{link.icon}
												</div>
												<span
													className={`font-semibold ${
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
				<ul className='flex flex-col gap-8'>
					{navigationOptions?.map(
						(option: Record<string, unknown>, index: number) => (
							<li className='flex flex-col' key={index}>
								<h5 className='mb-4 font-semibold text-slate-700 dark:text-slate-200'>
									{option.group as string}
								</h5>
								<ul className='ml-2 flex flex-col gap-4'>
									{Object.keys(option.pages).map(
										(page: string, j: number) => (
											<span
												className='text-slate-700 dark:text-slate-200'
												key={j}
											>
												{option.pages[page]}
											</span>
										)
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
