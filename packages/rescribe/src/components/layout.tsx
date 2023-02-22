import { ReactNode } from 'react'
import Container from './container'
import Footer from './footer'
import Navbar from './navbar'

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
