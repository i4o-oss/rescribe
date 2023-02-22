import { ReactNode } from 'react'
import Container from './container'

interface LayoutProps {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	return <Container>{props.children}</Container>
}

export default Layout
