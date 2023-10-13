import { Link, useLocation } from '@remix-run/react'

import { ReactNode, useContext } from 'react'

import { RescribeDocsContext } from '../constants'
import { NavLink, NavbarConfig } from '../types'

function Navbar({
	navbarConfig,
	themeConfig,
}: {
	navbarConfig?: NavbarConfig
	themeConfig?: {
		darkModeToggle?: ReactNode
	}
}) {
	const context = useContext(RescribeDocsContext)
	const location = useLocation()
	const navbar = context?.navbar ?? navbarConfig
	const theme = context?.theme ?? themeConfig

	return (
		<header className='supports-backdrop-blur:rs-bg-white/60 rs-sticky rs-top-0 rs-z-50 rs-flex rs-h-20 rs-w-screen rs-flex-wrap rs-items-center rs-justify-between rs-px-4 rs-py-4 rs-shadow-sm rs-shadow-gray-200 rs-backdrop-blur dark:rs-bg-transparent dark:rs-shadow-gray-700 sm:rs-px-6 lg:rs-px-8'>
			<div className='rs-relative rs-flex rs-flex-grow rs-basis-0 rs-items-center'>
				<Link
					aria-label='Home page'
					className='rs-flex rs-items-center rs-text-gray-900 dark:rs-text-gray-50'
					prefetch='viewport'
					to='/'
				>
					{typeof navbar?.logo === 'string' ? (
						<img
							className='rs-flex rs-h-8'
							src={navbar.logo}
							alt='logo'
						/>
					) : (
						navbar?.logo
					)}
				</Link>
			</div>
			<div className='rs-flex rs-flex-grow rs-items-center rs-justify-end rs-gap-4'>
				{navbar?.links && (
					<ul className='rs-flex rs-items-center rs-gap-4 rs-px-8'>
						{navbar?.links?.map((link: NavLink, index: number) => {
							return (
								<li className='rs-font-semibold' key={index}>
									{link?.external ? (
										<a
											className='rs-group rs-flex rs-items-center rs-gap-4 rs-text-gray-400 dark:rs-text-gray-600'
											href={link.href}
											target='_blank'
											rel='noreferrer noopener'
										>
											{link.icon ? (
												<div className='group-hover:rs-bg-brand-500 group-hover:dark:rs-bg-brand-500 rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 rs-transition-all rs-duration-300 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:dark:rs-text-white '>
													{link.icon}
												</div>
											) : null}
											<span className='rs-text-sm group-hover:rs-text-brand'>
												{link.label}
											</span>
										</a>
									) : (
										<Link
											className='rs-group rs-flex rs-items-center rs-gap-4 rs-text-gray-400 rs-transition-all rs-duration-300 dark:rs-text-gray-600'
											prefetch='viewport'
											to={link.href}
										>
											{link.icon ? (
												<div
													className={`group-hover:rs-bg-brand-500 group-hover:dark:rs-bg-brand-500 rs-rounded-md rs-p-1 rs-ring-1 rs-ring-zinc-400/25 group-hover:rs-text-white dark:rs-ring-zinc-700/40 group-hover:rs-dark:text-white ${
														link.href ===
														location.pathname
															? 'rs-bg-brand-500 rs-text-white'
															: ''
													} rs-transition-all rs-duration-300 `}
												>
													{link.icon}
												</div>
											) : null}
											<span
												className={`rs-text-sm ${
													link.href ===
														location.pathname ||
													location.pathname.startsWith(
														link.href
													)
														? 'rs-text-brand'
														: 'group-hover:rs-text-brand'
												}`}
											>
												{link.label}
											</span>
										</Link>
									)}
								</li>
							)
						})}
					</ul>
				)}
				{navbar?.search && (
					<input
						className='rs-h-10 rs-w-80 rs-rounded-md rs-bg-neutral-100 rs-px-4 rs-py-1 rs-text-sm dark:rs-bg-neutral-900 dark:rs-text-gray-300'
						placeholder='Search...'
					/>
				)}
				{navbar?.socials?.map((social: any, index: number) => (
					<a
						aria-label={social.ariaLabel}
						className='rs-text-black dark:rs-text-gray-100'
						href={social.href}
						key={`social-${index}`}
						rel='noreferrer noopener'
						target='_blank'
					>
						{social.icon}
					</a>
				))}
				{theme?.darkModeToggle}
			</div>
		</header>
	)
}

export default Navbar
