import { useContext } from 'react'
import { RescribeContext } from '../constants'

function Footer() {
	const { footer } = useContext(RescribeContext)

	return (
		<div className='sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-center border-t border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-[#040303]'>
			<div className='flex w-[88rem] items-center justify-between sm:px-2 lg:px-8 xl:px-12'>
				<div className='flex items-center gap-2 text-gray-900 dark:text-gray-400'>
					{footer?.text ? (
						footer?.text
					) : (
						<a
							className='text-sm no-underline'
							href='https://rescribe.site'
							target='_blank'
							rel='noreferrer noopener'
						>
							Powered by Rescribe
						</a>
					)}
				</div>
				<div className='flex items-center justify-end gap-4'>
					{footer?.socials?.map((social, index) => (
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
				</div>
			</div>
		</div>
	)
}

export default Footer
