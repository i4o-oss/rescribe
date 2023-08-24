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
			<Container>
				<CollectionProvider config={props.config} paths={params}>
					<CollectionItems />
				</CollectionProvider>
			</Container>
		)
	} else if (params?.collection && params.action === 'create') {
		component = (
			<Container>
				<CollectionProvider config={props.config} paths={params}>
					<NewCollectionItem />
				</CollectionProvider>
			</Container>
		)
	} else if (params?.collection && params.action === 'edit') {
		component = <div>Edit Item</div>
	} else if (params?.root) {
		component = (
			<Container>
				<Dashboard />
			</Container>
		)
	} else {
		component = <div>Not Found</div>
	}

	return (
		<ConfigProvider config={props.config}>
			{!params?.action ? <Navbar /> : null}
			{component}
		</ConfigProvider>
	)
}
