import { CalloutProps } from '../types'
import {
	CircleBackslashIcon,
	InfoCircledIcon,
	ExclamationTriangleIcon,
	CheckCircledIcon,
} from '@radix-ui/react-icons'

export default function Callout({ children, type = 'info' }: CalloutProps) {
	const classnames =
		'flex items-center gap-2 border px-4 py-2 rounded-lg mb-4'

	if (type === 'success') {
		return (
			<div
				className={`${classnames} border-green-600 bg-green-900/50 text-green-200`}
			>
				<CheckCircledIcon className='h-5 w-5 text-green-600' />
				{children}
			</div>
		)
	}

	if (type === 'warning') {
		return (
			<div
				className={`${classnames} border-orange-600 bg-orange-900/50 text-orange-200`}
			>
				<ExclamationTriangleIcon className='h-5 w-5 text-orange-600' />
				{children}
			</div>
		)
	}

	if (type === 'danger') {
		return (
			<div
				className={`${classnames} border-red-600 bg-red-900/50 text-red-200`}
			>
				<CircleBackslashIcon className='h-5 w-5 rotate-90 text-red-600' />
				{children}
			</div>
		)
	}

	if (type === 'tip') {
		return (
			<div
				className={`${classnames} border-purple-600 bg-purple-900/50 text-purple-200`}
			>
				<svg
					className='h-5 w-5 text-purple-600'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<line x1='9' y1='18' x2='15' y2='18'></line>
					<line x1='10' y1='22' x2='14' y2='22'></line>
					<path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14'></path>
				</svg>
				{children}
			</div>
		)
	}

	return (
		<div
			className={`${classnames} border-blue-600 bg-blue-900/50 text-blue-200`}
		>
			<InfoCircledIcon className='h-5 w-5 text-blue-600' />
			{children}
		</div>
	)
}
