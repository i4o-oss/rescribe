import RescribeDataProvider from '../core/data-provider'
import Container from './container'
import Footer from './footer'
import Navbar from './navbar'
import type { ReactNode } from 'react'

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
