import { ReactNode } from 'react'
import Container from './container'
import Navbar from './navbar'
import Footer from './footer'

interface LayoutProps {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	return (
		<>
			<Navbar />
			<Container>{props.children}</Container>
			<Footer />
		</>
	)
}

export default Layout
