import { Link } from '@remix-run/react'
import { useContext } from 'react'
import { RescribeContext } from '../constants'

function Navbar() {
	const { navbar, theme } = useContext(RescribeContext)

	return (
		<header className='supports-backdrop-blur:bg-white/60 sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-between px-4 py-4 shadow-sm shadow-gray-200 backdrop-blur dark:bg-transparent dark:shadow-gray-700 sm:px-6 lg:px-8'>
			<div className='relative flex flex-grow basis-0 items-center'>
				<Link aria-label='Home page' to='/'>
					{typeof navbar.logo === 'string' ? (
						<img
							className='flex h-8'
							src={navbar.logo}
							alt='logo'
						/>
					) : (
						navbar.logo
					)}
				</Link>
			</div>
			<div className='flex flex-grow items-center justify-end gap-4'>
				{navbar.search && (
					<input
						className='h-10 w-80 rounded-md bg-neutral-100 px-4 py-1 text-sm dark:bg-neutral-900 dark:text-gray-300'
						placeholder='Search...'
					/>
				)}
				{navbar.socials?.map((social, index) => (
					<a
						aria-label={social.ariaLabel}
						className='text-black dark:text-gray-100'
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
