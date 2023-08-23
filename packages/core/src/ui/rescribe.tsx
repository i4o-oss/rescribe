import { useLocation } from '@remix-run/react'

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
	const parsedPaths = parsePathname(location.pathname)

	let component = null
	if (parsedPaths?.collection && !parsedPaths.action) {
		component = (
			<CollectionProvider config={props.config} paths={parsedPaths}>
				<CollectionItems />
			</CollectionProvider>
		)
	} else if (parsedPaths?.collection && parsedPaths.action === 'create') {
		component = (
			<CollectionProvider config={props.config} paths={parsedPaths}>
				<NewCollectionItem />
			</CollectionProvider>
		)
	} else if (parsedPaths?.collection && parsedPaths.action === 'edit') {
		component = <div>Edit Item</div>
	} else if (parsedPaths?.root) {
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
