import { Link } from '@remix-run/react'

export default function Navbar() {
	return (
		<nav className='rs-w-full rs-h-20 rs-px-4 lg:rs-px-4 rs-border-b rs-border-gray-800 rs-flex rs-items-center'>
			<div className='rs-relative rs-mx-auto rs-flex rs-w-full rs-flex-col rs-py-5 md:rs-flex-row md:rs-items-center md:rs-justify-between md:rs-px-6'>
				<div className='rs-flex rs-flex-row rs-items-center rs-justify-between lg:rs-justify-start'>
					<Link
						className='rs-inline-flex rs-items-center rs-gap-4 lg:rs-pr-8'
						to='/'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='rs-text-rescribe-accent rs-w-5 rs-h-5'
						>
							<path d='m22 2-7 20-4-9-9-4Z' />
							<path d='M22 2 11 13' />
						</svg>
						<span className='rs-font-semibold'>rescribe</span>
					</Link>
				</div>
				{/* <nav className='rs-hidden rs-flex-grow rs-flex-col rs-items-center rs-gap-x-2 md:rs-flex md:rs-flex-row md:rs-justify-end md:rs-pb-0'> */}
				{/*     <a */}
				{/*         className='rs-text-accent-text rs-flex rs-items-center rs-gap-x-2 rs-px-2 rs-text-sm hover:rs-underline' */}
				{/*         href='/test' */}
				{/*         rel='noreferrer' */}
				{/*         target='_blank' */}
				{/*     > */}
				{/*         Test */}
				{/*     </a> */}
				{/* </nav> */}
			</div>
		</nav>
	)
}
