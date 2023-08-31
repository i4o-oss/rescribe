import { useLocation } from '@remix-run/react'

import { useMemo } from 'react'
import invariant from 'tiny-invariant'

import { parsePathname } from './helpers'
import { CollectionProvider, RescribeProvider } from './providers'
import type { RescribeData } from './types'
import CollectionItems from './ui/CollectionItems'
import { Dashboard } from './ui/Dashboard'
import EditCollectionItem from './ui/EditCollectionItem'
import Navbar from './ui/Navbar'
import NewCollectionItem from './ui/NewCollectionItem'

export default function Rescribe({ config }: RescribeData) {
	invariant(
		config,
		'`config` prop is missing. Check the docs to see how to write the configuration and pass it to the Rescribe component.'
	)

	const location = useLocation()
	const params = useMemo(
		() => parsePathname(location.pathname),
		[location.pathname]
	)

	let component = null
	if (params?.collection && !params.action) {
		component = (
			<CollectionProvider config={config} params={params}>
				<CollectionItems />
			</CollectionProvider>
		)
	} else if (params?.collection && params.action === 'create') {
		component = (
			<CollectionProvider config={config} params={params}>
				<NewCollectionItem />
			</CollectionProvider>
		)
	} else if (params?.collection && params.action === 'edit') {
		component = (
			<CollectionProvider config={config} params={params}>
				<EditCollectionItem />
			</CollectionProvider>
		)
	} else if (params?.root) {
		component = <Dashboard />
	} else {
		component = <div>Not Found</div>
	}

	return (
		<RescribeProvider config={config}>
			{!params?.action ? <Navbar /> : null}
			{component}
		</RescribeProvider>
	)
}
