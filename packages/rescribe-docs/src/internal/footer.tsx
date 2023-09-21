import { useContext } from 'react'

import { RescribeDocsContext } from '../constants'
import { FooterConfig } from '../types'

function Footer({ footerConfig }: { footerConfig?: FooterConfig }) {
	const context = useContext(RescribeDocsContext)
	const footer = context?.footer ?? footerConfig

	return (
		<div className='rs-sticky rs-top-0 rs-z-50 rs-flex rs-h-20 rs-w-screen rs-flex-wrap rs-items-center rs-justify-center rs-border-t rs-border-gray-200 rs-py-4 dark:rs-border-gray-700'>
			<div className='rs-flex rs-w-[88rem] rs-items-center rs-justify-between sm:rs-px-2 lg:rs-px-8 xl:rs-px-12'>
				<div className='rs-flex rs-items-center rs-gap-2 rs-text-gray-900 dark:rs-text-gray-400'>
					{footer?.text ? (
						footer?.text
					) : (
						<a
							className='rs-text-sm rs-no-underline'
							href='https://rescribe.site'
							target='_blank'
							rel='noreferrer noopener'
						>
							Powered by Rescribe
						</a>
					)}
				</div>
				<div className='rs-flex rs-items-center rs-justify-end rs-gap-4'>
					{footer?.socials?.map((social: any, index: number) => (
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
				</div>
			</div>
		</div>
	)
}

export default Footer
