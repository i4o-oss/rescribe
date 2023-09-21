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
			<div className='rs-sticky rs-top-20 rs-flex rs-h-[calc(100vh-10rem)] rs-min-w-[16rem] rs-flex-col rs-gap-8 rs-overflow-y-auto rs-overflow-x-hidden rs-py-16 rs-pr-4 rs-pl-1'>
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
				<ul className='rs-flex rs-flex-col rs-gap-8'>
					{navigationOptions.length > 0 &&
						navigationOptions?.map(
							(option: Record<string, string>, index: number) => (
								<li className='rs-flex rs-flex-col' key={index}>
									{option.title ? (
										<h5 className='rs-mb-4 rs-text-sm rs-font-semibold rs-text-gray-700 dark:rs-text-gray-200'>
											{option.title as string}
										</h5>
									) : null}
									{Object.keys(option.pages).length > 0 ? (
										<ul className='rs-flex rs-flex-col rs-gap-2 rs-border-l rs-border-gray-100 dark:rs-border-gray-800'>
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
																className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
																	location.pathname ===
																	`/${root}`
																		? 'rs-border-brand-500 rs-text-brand-500'
																		: 'hover:rs-border-brand-500 hover:dark:rs-border-brand-500 rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
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
															className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
																location.pathname ===
																`/${root}/${page}`
																	? 'rs-border-brand-500 rs-text-brand-500'
																	: 'hover:rs-border-brand-500 hover:dark:rs-border-brand-500 hover:rs-text-brand-500 hover:dark:rs-text-brand-500 rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
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
