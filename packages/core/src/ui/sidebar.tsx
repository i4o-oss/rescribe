import { Link, useLocation } from '@remix-run/react'

type Props = {
	config: any
}

function Sidebar(props: Props) {
	const location = useLocation()
	const [, root, , _] = location.pathname.split('/')
	const collections = props.config.collections

	return (
		<div className='rs-relative'>
			<div className='rs-sticky rs-top-20 rs-flex rs-h-[calc(100vh-5rem)] rs-min-w-[20rem] rs-flex-col rs-gap-8 rs-overflow-y-auto rs-overflow-x-hidden rs-py-8 rs-px-4 rs-border-r rs-border-gray-800'>
				<Link
					className={`rs-group rs-flex rs-items-center rs-gap-2 rs-px-4 rs-py-2 rs-rounded-md rs-transition-all rs-duration-200 ${
						location.pathname === `/${root}`
							? 'rs-bg-rescribe-accent/20 rs-text-gray-100'
							: 'rs-text-gray-600 dark:rs-text-gray-400 hover:rs-bg-rescribe-accent/20'
					}`}
					to={`/${root}`}
				>
					<span>
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
							<rect width='7' height='9' x='3' y='3' rx='1' />
							<rect width='7' height='5' x='14' y='3' rx='1' />
							<rect width='7' height='9' x='14' y='12' rx='1' />
							<rect width='7' height='5' x='3' y='16' rx='1' />
						</svg>
					</span>
					<span className={`rs-text-sm`}>Dashboard</span>
				</Link>
				<ul className='rs-flex rs-flex-col rs-gap-8'>
					<li className='rs-flex rs-flex-col'>
						<h5 className='rs-mb-2 rs-px-4 rs-text-sm rs-font-semibold rs-text-gray-400 dark:rs-text-gray-600'>
							Collections
						</h5>
						<ul className='rs-flex rs-flex-col rs-gap-1'>
							{Object.keys(collections).map((key) => (
								<Link
									className={`rs-py-2 rs-px-4 rs-text-sm rs-rounded-md rs-transition-colors rs-duration-200 ${
										location.pathname ===
										`/${root}/collections/${key}`
											? 'rs-bg-rescribe-accent/20 rs-text-rescribe-accent'
											: 'rs-text-gray-600 dark:rs-text-gray-400 hover:rs-bg-rescribe-accent/20'
									}`}
									key={key}
									to={`/${root}/collections/${key}`}
								>
									{collections[key].label}
								</Link>
							))}
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
