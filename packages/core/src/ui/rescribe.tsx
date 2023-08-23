import { useLocation } from '@remix-run/react'
import { parsePathname } from '../helpers'
import { ConfigProvider } from '../provider'
import type { Collections, Config } from '../types'
import Container from './container'
import { Dashboard } from './dashboard'
import Navbar from './navbar'

export default function Rescribe(props: { config: Config<Collections> }) {
	const location = useLocation()
	const parsedPaths = parsePathname(location.pathname)

	let component = null
	if (parsedPaths?.collection && !parsedPaths.action) {
		component = <div>List Items</div>
	} else if (parsedPaths?.collection && parsedPaths.action === 'create') {
		component = <div>Create Item</div>
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
