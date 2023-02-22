import { IconButton } from '@i4o-oss/catalystui'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

function Footer() {
	return (
		<div className='rs-w-screen rs-h-20 rs-sticky rs-top-0 rs-z-50 rs-flex rs-flex-wrap rs-items-center rs-justify-center rs-px-4 sm:rs-px-6 lg:rs-px-8 rs-py-4 rs-border-t rs-border-gray-200 dark:rs-border-gray-700 dark:rs-bg-[#040303] bg-white'>
			<div className='rs-w-[88rem] rs-flex rs-items-center rs-justify-between'>
				<div className='rs-flex rs-items-center rs-text-gray-900 dark:rs-text-gray-400 rs-gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='m7 11 2-2-2-2'></path>
						<path d='M11 13h4'></path>
						<rect
							x='3'
							y='3'
							width='18'
							height='18'
							rx='2'
							ry='2'
						></rect>
					</svg>
					<p>
						Built by{' '}
						<a
							className='rs-underline'
							href='https://i4o.dev'
							target='_blank'
							rel='noreferrer noopener'
						>
							i4o
						</a>
						.
					</p>
				</div>
				<div className='rs-flex rs-items-center rs-justify-end'>
					<a
						aria-label='Github Repo'
						href='https://github.com/i4o-oss/rescribe'
						target='_blank'
						rel='noreferrer noopener'
					>
						<IconButton
							bg='!rs-bg-transparent hover:!rs-bg-transparent'
							padding='rs-p-2'
							icon={
								<GitHubLogoIcon className='rs-w-6 rs-h-6 rs-text-black dark:rs-text-gray-100' />
							}
						/>
					</a>
					<a
						aria-label='Twitter Profile'
						href='https://twitter.com/i4o_dev'
						target='_blank'
						rel='noreferrer noopener'
					>
						<IconButton
							bg='!rs-bg-transparent hover:!rs-bg-transparent'
							padding='rs-p-2'
							icon={
								<TwitterLogoIcon className='rs-w-6 rs-h-6 rs-text-black dark:rs-text-gray-100' />
							}
						/>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
