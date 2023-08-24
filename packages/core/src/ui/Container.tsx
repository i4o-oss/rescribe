import type { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
}

function Container(props: ContainerProps) {
	return (
		<div className='rs-relative rs-flex rs-items-start rs-justify-center rs-min-h-[calc(100vh-5rem)] rs-w-full rs-py-16'>
			<div className='rs-w-full rs-max-w-4xl rs-flex rs-text-foreground'>
				{props.children}
			</div>
		</div>
	)
}

export default Container
