import { Link, useLocation, useNavigate } from '@remix-run/react'

import { Button, PrimaryButton, Select } from '@i4o/catalystui'
import { useContext, useEffect, useMemo, useState } from 'react'

import { BASE_PATH } from '../constants'
import { parsePathname } from '../helpers'
import { ConfigContext } from '../providers'

function CollectionSelector({
	location,
	params,
}: {
	location: any
	params: any
}) {
	const { collections } = useContext(ConfigContext)
	const navigate = useNavigate()
	const [selectedCollection, setSelectedCollection] = useState(
		params?.collection
	)

	useEffect(() => {
		if (params?.collection) {
			setSelectedCollection(params.collection)
		}
	}, [location, params])

	const COLLECTION_SELECT_ITEMS = Object.keys(collections).map((key) => {
		const collection = collections[key]

		return {
			label: collection.label,
			value: key,
		}
	})

	function collectionChangeHandler(value: string) {
		setSelectedCollection(value)
		navigate(`${BASE_PATH}/collections/${value}`)
	}

	return (
		<Select
			items={COLLECTION_SELECT_ITEMS}
			name='collectionSelector'
			onValueChange={collectionChangeHandler}
			value={selectedCollection}
		/>
	)
}

export default function Navbar() {
	const location = useLocation()
	const params = useMemo(
		() => parsePathname(location.pathname),
		[location.pathname]
	)

	return (
		<nav className='rs-w-full rs-h-20 rs-px-4 lg:rs-px-4 rs-border-b rs-border-gray-100 dark:rs-border-gray-800 rs-flex rs-items-center'>
			<div className='rs-relative rs-mx-auto rs-flex rs-w-full rs-py-5 rs-items-center rs-justify-between rs-px-6'>
				<div className='rs-flex rs-flex-row rs-items-center rs-justify-start rs-gap-4 rs-text-sm rs-text-foreground'>
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
							className='rs-text-brand rs-w-5 rs-h-5'
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
					{params?.collection ? (
						<>
							<span>/</span>
							<span>collections</span>
							{params.collection ? (
								<>
									<span>/</span>
									<CollectionSelector
										location={location}
										params={params}
									/>
								</>
							) : null}
						</>
					) : null}
				</div>
				<nav className='rs-flex rs-items-center rs-gap-x-2'>
					{params?.collection && params.action ? (
						<>
							<Button>Save</Button>
							<PrimaryButton>Publish</PrimaryButton>
						</>
					) : null}
				</nav>
			</div>
		</nav>
	)
}
