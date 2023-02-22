import { useContext } from 'react'
import { Link } from '@remix-run/react'
import { RescribeContext } from '../constants'
import { SidebarLink } from '../types'

function Sidebar() {
	const config = useContext(RescribeContext)

	return (
		<div className='relative'>
			<div className='sticky top-20 h-[calc(100vh-5rem)] min-w-[20rem] space-y-4 overflow-y-auto overflow-x-hidden border-r border-gray-200 py-8 pr-4 pl-1 dark:border-gray-800'>
				{config.sidebar?.search ? (
					<input
						className='h-12 w-72 rounded-md bg-neutral-100 px-4 py-1 text-sm text-gray-500 dark:bg-neutral-900 dark:text-gray-300'
						placeholder='Search...'
					/>
				) : null}
				{config.sidebar?.links && (
					<ul className='flex flex-col space-y-4'>
						{config.sidebar?.links?.map(
							(link: SidebarLink, index: number) => {
								return (
									<li
										className='lg:text-md flex items-center font-semibold text-gray-700 transition-all duration-300 hover:text-gray-900 lg:leading-6'
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
