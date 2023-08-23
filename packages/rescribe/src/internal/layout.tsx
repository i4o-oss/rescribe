import type { ReactNode } from 'react'

import RescribeDataProvider from '../core/data-provider'
import Container from './container'
import Footer from './footer'
import Navbar from './navbar'

interface LayoutProps {
	children: ReactNode
	data: any
}

function Layout(props: LayoutProps) {
	return (
		<RescribeDataProvider data={props.data}>
			<Navbar />
			<Container>{props.children}</Container>
			<Footer />
		</RescribeDataProvider>
	)
}

export default Layout
