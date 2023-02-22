import { Link } from '@remix-run/react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { RescribeContext } from '../constants'

function Navbar() {
	const config = useContext(RescribeContext)

	// const navItems = [
	// 	{
	// 		id: '1',
	// 		label: 'Docs',
	// 		href: '/docs',
	// 	},
	// 	{
	// 		id: '2',
	// 		label: 'About',
	// 		href: '/about',
	// 	},
	// ]

	return (
		<header className='flex h-20 w-screen flex-wrap items-center justify-between bg-white px-4 py-4 shadow-sm shadow-gray-200 dark:bg-[#040303] dark:shadow-gray-700 sm:px-6 lg:px-8'>
			<div className='relative flex flex-grow basis-0 items-center'>
				<Link aria-label='Home page' to='/'>
					{typeof config.logo === 'string' ? (
						<img className='flex h-8' src={config.logo} />
					) : (
						config.logo
					)}
				</Link>
			</div>
			<div className='flex flex-grow items-center justify-end gap-4'>
				{/* <Nav items={navItems} /> */}
				{config.navbar?.search && (
					<input
						className='h-12 w-80 rounded-md bg-neutral-100 px-4 py-1 text-sm dark:bg-neutral-900 dark:text-gray-300'
						placeholder='Search...'
					/>
				)}
				<a
					aria-label='Github Repo'
					href='https://github.com/i4o-oss/rescribe'
					target='_blank'
					rel='noreferrer noopener'
				>
					<GitHubLogoIcon className='h-6 w-6 text-black dark:text-gray-100' />
				</a>
				{config.theme?.darkModeToggle}
			</div>
		</header>
	)
}

export default Navbar
