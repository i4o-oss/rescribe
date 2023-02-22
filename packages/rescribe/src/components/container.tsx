import type { ReactNode } from 'react'
import Sidebar from './sidebar'
import ToC from './toc'

interface ContainerProps {
	children: ReactNode
}

function Container(props: ContainerProps) {
	return (
		<div className='relative mx-auto flex w-full min-h-[90rem] max-w-[88rem] justify-center sm:px-2 lg:px-8 xl:px-12'>
			<Sidebar />
			<div className='flex-auto max-w-2xl px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-0 xl:px-16 prose dark:prose-invert'>
				{props.children}
			</div>
			<ToC />
		</div>
	)
}

export default Container
