import type { ReactNode } from 'react'
import Sidebar from './sidebar'

interface ContainerProps {
	children: ReactNode
	config: any
}

function Container(props: ContainerProps) {
	return (
		<div className='relative mx-auto flex min-h-[calc(100vh-5rem)] w-full justify-between'>
			<Sidebar config={props.config} />
			<div className='prose dark:prose-invert max-w-4xl flex-auto px-4 py-16 lg:pr-0 lg:pl-0 xl:px-16 [&_h2]:scroll-mt-36 [&_h3]:scroll-mt-36'>
				{props.children}
			</div>
		</div>
	)
}

export default Container
