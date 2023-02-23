import type { ReactNode } from 'react'
import Sidebar from './sidebar'
import ToC from './toc'

interface ContainerProps {
	children: ReactNode
}

function Container(props: ContainerProps) {
	return (
		<div className='relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[88rem] justify-between sm:px-2 lg:px-8 xl:px-12'>
			<Sidebar />
			<div className='prose dark:prose-invert max-w-4xl flex-auto px-4 py-16 lg:pr-0 lg:pl-0 xl:px-16'>
				{props.children}
			</div>
			<ToC />
		</div>
	)
}

export default Container
