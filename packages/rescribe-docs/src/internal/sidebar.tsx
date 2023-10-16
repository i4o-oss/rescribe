import { Link, useLocation } from '@remix-run/react'

import { useContext } from 'react'

import { RescribeDocsContext } from '../constants'
import type { NavigationLinkGroup, SidebarLink } from '../types'

function Sidebar() {
	const context = useContext(RescribeDocsContext)
	const sidebar = context?.sidebar
	const location = useLocation()
	const params = location.pathname.split('/')
	const root = params[1]
	// TODO: fix this type later
	const navigationOptions = sidebar?.navigation[root] as NavigationLinkGroup[]

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
												<div className='group-hover:rs-bg-brand group-hover:dark:rs-bg-brand rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 rs-transition-all rs-duration-300 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:dark:rs-text-white '>
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
													className={`group-hover:rs-bg-brand group-hover:dark:rs-bg-brand rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:rs-dark:text-white ${
														link.href ===
															location.pathname ||
														location.pathname.startsWith(
															link.href
														)
															? 'rs-bg-brand rs-text-white'
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
															? 'rs-text-brand'
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
						navigationOptions?.map((option, index: number) => (
							<li className='rs-flex rs-flex-col' key={index}>
								{option.title ? (
									<h5 className='rs-mb-4 rs-text-sm rs-font-semibold rs-text-gray-700 dark:rs-text-gray-200'>
										{option.title as string}
									</h5>
								) : null}
								{Object.keys(option.pages).length > 0 ? (
									<ul className='rs-flex rs-flex-col rs-gap-2 rs-border-l rs-border-gray-100 dark:rs-border-gray-800'>
										{Object.entries(option.pages).map(
											(entry, j: number) => {
												const [page, link] = entry
												if (typeof link === 'string') {
													if (
														page === 'index' ||
														page === '_index'
													) {
														return (
															<Link
																className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
																	location.pathname ===
																	`/${root}`
																		? 'rs-border-brand rs-text-brand'
																		: 'hover:rs-border-brand hover:dark:rs-border-brand hover:rs-text-brand hover:dark:rs-text-brand rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
																}`}
																key={j}
																to={`/${root}`}
															>
																{link}
															</Link>
														)
													}

													return (
														<Link
															className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
																location.pathname ===
																`/${root}/${page}`
																	? 'rs-border-brand rs-text-brand'
																	: 'hover:rs-border-brand hover:dark:rs-border-brand hover:rs-text-brand hover:dark:rs-text-brand rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
															}`}
															key={j}
															to={page}
														>
															{link}
														</Link>
													)
												}

												if (link?.external) {
													return (
														<a
															href={link.url}
															className='rs-flex rs-items-center rs-gap-2 -rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 hover:rs-border-brand hover:dark:rs-border-brand hover:rs-text-brand hover:dark:rs-text-brand rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
															key={j}
															target='_blank'
															rel='noreferrer'
														>
															{link.title}
															<svg
																xmlns='http://www.w3.org/2000/svg'
																viewBox='0 0 24 24'
																fill='none'
																stroke='currentColor'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'
																className='rs-w-4 rs-h-4'
															>
																<path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
																<polyline points='15 3 21 3 21 9' />
																<line
																	x1='10'
																	x2='21'
																	y1='14'
																	y2='3'
																/>
															</svg>
														</a>
													)
												}

												if (
													page === 'index' ||
													page === '_index'
												) {
													return (
														<Link
															className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
																location.pathname ===
																`/${root}`
																	? 'rs-border-brand rs-text-brand'
																	: 'hover:rs-border-brand hover:dark:rs-border-brand hover:rs-text-brand hover:dark:rs-text-brand rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
															}`}
															key={j}
															to={`/${root}`}
														>
															{link.title}
														</Link>
													)
												}

												return (
													<Link
														className={`-rs-ml-[1px] rs-border-l rs-py-1 rs-pl-4 rs-text-sm rs-transition-colors rs-duration-300 ${
															location.pathname ===
															`/${root}/${link.url}`
																? 'rs-border-brand rs-text-brand'
																: 'hover:rs-border-brand hover:dark:rs-border-brand hover:rs-text-brand hover:dark:rs-text-brand rs-border-transparent rs-text-gray-700 dark:rs-text-gray-200'
														}`}
														key={j}
														to={link.url}
													>
														{link.title}
													</Link>
												)
											}
										)}
									</ul>
								) : null}
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
