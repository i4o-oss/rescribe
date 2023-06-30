import type { ReactNode } from 'react'
import Container from './container'
import Navbar from './navbar'
import Footer from './footer'
import RescribeDataProvider from '../core/data-provider'

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
