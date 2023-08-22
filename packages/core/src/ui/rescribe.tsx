// import { useLocation } from '@remix-run/react'
import type { Config } from '../types'
import Container from './container'
import Navbar from './navbar'

export default function Rescribe(props: { config: Config<any> }) {
	return (
		<>
			<Navbar />
			<Container config={props.config}>
				<div className='rs-text-red-500'>
					Rescribe Dashboard Component
				</div>
			</Container>
		</>
	)
}
