import { Link, useLocation } from '@remix-run/react'
import { BASE_PATH } from '../constants'

export default function Navbar() {
	const location = useLocation()
	const parts = location.pathname.split('/')

	return (
		<nav className='rs-w-full rs-h-20 rs-px-4 lg:rs-px-4 rs-border-b rs-border-gray-100 dark:rs-border-gray-800 rs-flex rs-items-center'>
			<div className='rs-relative rs-mx-auto rs-flex rs-w-full rs-flex-col rs-py-5 md:rs-flex-row md:rs-items-center md:rs-justify-between md:rs-px-6'>
				<div className='rs-flex rs-flex-row rs-items-center rs-justify-start rs-gap-4 rs-text-sm'>
					<Link
						className='rs-inline-flex rs-items-center rs-gap-2'
						to={BASE_PATH}
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
							<rect width='7' height='9' x='3' y='3' rx='1' />
							<rect width='7' height='5' x='14' y='3' rx='1' />
							<rect width='7' height='9' x='14' y='12' rx='1' />
							<rect width='7' height='5' x='3' y='16' rx='1' />
						</svg>
						<span className='rs-text-sm rs-font-semibold'>
							rescribe
						</span>
					</Link>
					{parts[2] === 'collections' ? (
						<>
							<span>/</span>
							<span>collections</span>
							{parts[3] !== '' ? (
								<>
									<span>/</span>
									<span>{parts[3]}</span>
								</>
							) : null}
						</>
					) : null}
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
