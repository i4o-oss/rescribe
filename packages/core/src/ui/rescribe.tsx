import { useLocation } from '@remix-run/react'

import { useMemo } from 'react'

import { parsePathname } from '../helpers'
import { CollectionProvider, ConfigProvider } from '../providers'
import type { Collections, Config } from '../types'
import CollectionItems from './CollectionItems'
import Container from './Container'
import { Dashboard } from './Dashboard'
import Navbar from './Navbar'
import NewCollectionItem from './NewCollectionItem'

export default function Rescribe(props: { config: Config<Collections> }) {
	const location = useLocation()
	const params = useMemo(
		() => parsePathname(location.pathname),
		[location.pathname]
	)

	let component = null
	if (params?.collection && !params.action) {
		component = (
			<CollectionProvider config={props.config} paths={params}>
				<CollectionItems />
			</CollectionProvider>
		)
	} else if (params?.collection && params.action === 'create') {
		component = (
			<CollectionProvider config={props.config} paths={params}>
				<NewCollectionItem />
			</CollectionProvider>
		)
	} else if (params?.collection && params.action === 'edit') {
		component = <div>Edit Item</div>
	} else if (params?.root) {
		component = <Dashboard />
	} else {
		component = <div>Not Found</div>
	}

	return (
		<ConfigProvider config={props.config}>
			<Navbar />
			<Container>{component}</Container>
		</ConfigProvider>
	)
}
