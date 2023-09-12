import { Link } from '@remix-run/react'

import { CardProps } from '../types'

export default function Card(props: CardProps) {
	const CardElement = () => (
		<>
			<div className='text-brand-500 mb-4 h-6 w-6'>{props.icon}</div>
			<h2 className='m-0 mb-2 text-base'>{props.title}</h2>
			<span className='text-sm leading-normal'>{props.description}</span>
		</>
	)

	if (props.href.startsWith('/')) {
		return (
			<Link
				className='hover:border-brand-500 hover:dark:border-brand-500 flex flex-col items-start rounded-lg border-2 border-gray-400 px-6 py-5 no-underline transition-all duration-200 dark:border-gray-600'
				to={props.href}
			>
				<CardElement />
			</Link>
		)
	}

	return (
		<a
			className='hover:border-brand-500 hover:dark:border-brand-500 flex flex-col items-start rounded-lg border-2 border-gray-400 px-6 py-5 no-underline transition-colors duration-200 dark:border-gray-600'
			href={props.href}
			target='_blank'
			rel='noopener noreferrer'
		>
			<CardElement />
		</a>
	)
}
