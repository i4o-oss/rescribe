// import { useLocation } from '@remix-run/react'
import { ConfigProvider } from '../provider'
import type { Config } from '../types'
import Container from './container'
import { Dashboard } from './dashboard'
import Navbar from './navbar'

export default function Rescribe(props: { config: Config<any> }) {
	return (
		<ConfigProvider config={props.config}>
			<Navbar />
			<Container>
				<Dashboard />
			</Container>
		</ConfigProvider>
	)
}
