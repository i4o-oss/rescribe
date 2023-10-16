import { Link, useLocation } from '@remix-run/react'

import { Button, IconButton } from '@i4o/catalystui'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useContext } from 'react'

import { BASE_PATH } from '../constants'
import { parseAdminPathname } from '../helpers'
import { CollectionContext } from '../providers'

export default function Header({
	fetcherState,
	sheetOpen,
	setSheetOpen,
}: {
	fetcherState: 'idle' | 'submitting' | 'loading'
	sheetOpen: boolean
	setSheetOpen: Dispatch<SetStateAction<boolean>>
}) {
	const collection = useContext(CollectionContext)
	const location = useLocation()
	const params = useMemo(
		() => parseAdminPathname({ pathname: location.pathname }),
		[location.pathname]
	)

	return (
		<>
			<header
				className={`rs-fixed rs-top-0 rs-left-0 rs-right-0 ${
					sheetOpen ? 'rs-w-[calc(100vw-24rem)]' : 'rs-w-screen'
				} rs-h-24 rs-grid rs-grid-cols-2 rs-gap-8 rs-z-auto`}
			>
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
				<div className='rs-flex rs-items-center rs-justify-end rs-px-8 rs-gap-8'>
					{/* TODO: show create button only when title is not empty and loses focus */}
					<Button
						className='rs-h-8 rs-text-brand !rs-bg-transparent'
						loading={fetcherState !== 'idle'}
						loadingText={
							params?.collection && params.action === 'edit'
								? 'Updating...'
								: 'Creating...'
						}
						type='submit'
					>
						{params?.collection && params.action === 'edit'
							? 'Update'
							: 'Create'}
					</Button>
					{!sheetOpen ? (
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
					) : null}
				</div>
			</header>
		</>
	)
}
