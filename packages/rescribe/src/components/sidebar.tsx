import { useContext } from 'react'
import { Link } from '@remix-run/react'
import { RescribeContext } from '../constants'
import { SidebarLink } from '../types'

function Sidebar() {
	const config = useContext(RescribeContext)

	return (
		<div className='rs-relative'>
			<div className='rs-sticky rs-top-20 rs-min-w-[20rem] rs-h-[calc(100vh-5rem)] rs-overflow-y-auto rs-overflow-x-hidden rs-py-8 rs-pr-4 rs-pl-1 rs-border-r rs-border-gray-200 dark:rs-border-gray-800 rs-space-y-4'>
				{config.sidebar?.search ? (
					<input
						className='rs-w-72 rs-h-12 rs-px-4 rs-py-1 rs-rounded-md rs-bg-neutral-100 dark:rs-bg-neutral-900 dark:rs-text-gray-300 rs-text-sm'
						placeholder='Search...'
					/>
				) : null}
				{config.sidebar?.links && (
					<ul className='rs-flex rs-flex-col rs-space-y-4'>
						{config.sidebar?.links?.map(
							(link: SidebarLink, index: number) => {
								return (
									<li
										className='rs-flex rs-items-center lg:rs-text-md lg:rs-leading-6 rs-font-semibold rs-transition-all rs-duration-300 hover:rs-text-gray-900 rs-text-gray-700'
										key={index}
									>
										{link?.external ? (
											<a
												href={link.href}
												target='_blank'
												rel='noreferrer noopener'
											>
												{link.label}
											</a>
										) : (
											<Link to={link.href}>
												{link.label}
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
