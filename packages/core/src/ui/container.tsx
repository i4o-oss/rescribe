import type { ReactNode } from 'react'
import Sidebar from './sidebar'

interface ContainerProps {
	children: ReactNode
	config: any
}

function Container(props: ContainerProps) {
	return (
		<div className='rs-relative rs-flex rs-min-h-[calc(100vh-5rem)] rs-w-full'>
			<Sidebar config={props.config} />
			<div className='rs-w-full rs-flex rs-p-8'>{props.children}</div>
		</div>
	)
}

export default Container
