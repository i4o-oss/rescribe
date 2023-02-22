import type { ReactNode } from 'react'
import Sidebar from './sidebar'
import ToC from './toc'

interface ContainerProps {
	children: ReactNode
}

function Container(props: ContainerProps) {
	return (
		<div className='rs-relative rs-mx-auto rs-flex rs-w-full rs-min-h-[90rem] rs-max-w-[88rem] rs-justify-center sm:rs-px-2 lg:rs-px-8 xl:rs-px-12'>
			<Sidebar />
			<div className='rs-flex-auto rs-max-w-2xl rs-px-4 rs-py-16 lg:rs-max-w-none lg:rs-pr-0 lg:rs-pl-0 xl:rs-px-16 rs-prose dark:rs-prose-invert'>
				{props.children}
			</div>
			<ToC />
		</div>
	)
}

export default Container
