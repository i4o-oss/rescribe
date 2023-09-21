import { Link, useLocation } from '@remix-run/react'

import { useContext } from 'react'

import { RescribeDocsContext } from '../constants'
import type { SidebarLink } from '../types'
import navbar from './navbar'

function Sidebar() {
	const context = useContext(RescribeDocsContext)
	const sidebar = context?.sidebar
	const location = useLocation()
	const [, root, , _] = location.pathname.split('/')
	// TODO: fix this type later
	const navigationOptions = sidebar?.navigation[root] as Array<any>

	return (
		<div className='rs-relative'>
			<div className='rs-sticky rs-top-20 rs-flex rs-h-[calc(100vh-10rem)] rs-min-w-[16rem] rs-flex-col rs-gap-8 rs-overflow-y-auto rs-overflow-x-hidden rs-py-8 rs-pr-4 rs-pl-1'>
				{sidebar?.search ? (
					<input
						className='rs-h-12 rs-w-full rs-rounded-md rs-bg-neutral-100 rs-px-4 rs-py-1 rs-text-sm rs-text-gray-500 dark:rs-bg-neutral-900 dark:rs-text-gray-300'
						placeholder='Search...'
					/>
				) : null}
				{sidebar?.links && (
					<ul className='rs-flex rs-flex-col rs-gap-4'>
						{sidebar?.links?.map(
							(link: SidebarLink, index: number) => {
								return (
									<li key={index}>
										{link?.external ? (
											<a
												className='rs-group rs-flex rs-items-center rs-gap-4 rs-text-gray-400 dark:rs-text-gray-600'
												href={link.href}
												target='_blank'
												rel='noreferrer noopener'
											>
												<div className='group-hover:rs-bg-brand-500 group-hover:dark:rs-bg-brand-500 rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 rs-transition-all rs-duration-300 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:dark:rs-text-white '>
													{link.icon}
												</div>
												<span className='rs-text-sm rs-font-semibold'>
													{link.label}
												</span>
											</a>
										) : (
											<Link
												className='rs-group rs-flex rs-items-center rs-gap-4 rs-text-gray-400 rs-transition-all rs-duration-300 dark:rs-text-gray-600'
												to={link.href}
											>
												<div
													className={`group-hover:rs-bg-brand-500 group-hover:dark:rs-bg-brand-500 rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:rs-dark:text-white ${
														link.href ===
															location.pathname ||
														location.pathname.startsWith(
															link.href
														)
															? 'rs-bg-brand-500 rs-text-white'
															: ''
													} rs-transition-all rs-duration-300 `}
												>
													{link.icon}
												</div>
												<span
													className={`rs-text-sm rs-font-semibold ${
														link.href ===
															location.pathname ||
														location.pathname.startsWith(
															link.href
														)
															? 'rs-text-brand-500'
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
					{navigationOptions.length > 0 &&
						navigationOptions?.map(
							(option: Record<string, string>, index: number) => (
								<li className='flex flex-col' key={index}>
									{option.group ? (
										<h5 className='mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200'>
											{option.group as string}
										</h5>
									) : null}
									{Object.keys(option.pages).length > 0 ? (
										<ul className='flex flex-col gap-2 border-l border-gray-100 dark:border-gray-800'>
											{Object.entries(option.pages).map(
												(
													entry: string[],
													j: number
												) => {
													const [page, title] = entry
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
																{title}
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
															{title}
														</Link>
													)
												}
											)}
										</ul>
									) : null}
								</li>
							)
						)}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
