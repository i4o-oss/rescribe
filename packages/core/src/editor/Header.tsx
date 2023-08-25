import { Link } from '@remix-run/react'

import { Button, IconButton } from '@i4o/catalystui'
import type { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

import { BASE_PATH } from '../constants'
import { CollectionContext } from '../providers'

export default function Header({
	setSheetOpen,
}: {
	setSheetOpen: Dispatch<SetStateAction<boolean>>
}) {
	const collection = useContext(CollectionContext)

	return (
		<>
			<header className='rs-fixed rs-top-0 rs-left-0 rs-right-0 rs-w-screen rs-h-24 rs-grid rs-grid-cols-2 rs-gap-8 rs-z-auto'>
				<div className='rs-flex rs-items-center rs-justify-start rs-px-8 rs-gap-4'>
					<Link to={`${BASE_PATH}/collections/${collection?.slug}`}>
						<Button
							className='rs-h-8 rs-pl-2 !rs-bg-transparent'
							leftIcon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='rs-w-4 rs-h-4 rs-text-foreground'
								>
									<path d='m15 18-6-6 6-6' />
								</svg>
							}
						>
							{collection?.label || 'Back'}
						</Button>
					</Link>
				</div>
				<div className='rs-flex rs-items-center rs-justify-end rs-px-8 rs-gap-4'>
					{/* <Button className='rs-h-8 rs-text-brand !rs-bg-transparent'>Publish</Button> */}
					<IconButton
						className='rs-w-8 rs-h-8 rs-p-1 !rs-bg-transparent'
						icon={
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
								<rect
									width='18'
									height='18'
									x='3'
									y='3'
									rx='2'
									ry='2'
								/>
								<line x1='15' x2='15' y1='3' y2='21' />
							</svg>
						}
						onClick={() => setSheetOpen(true)}
					/>
				</div>
			</header>
		</>
	)
}
