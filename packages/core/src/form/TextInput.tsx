import type { TextField } from '../types'

type Props = TextField & {
	defaultValue?: string
	key: string
}

// TODO: if multiline is true, return a textarea
export default function TextInput({
	defaultValue = '',
	description,
	label,
	key,
	multiline,
}: Props) {
	return (
		<div className='rs-flex rs-w-full rs-flex-col rs-gap-4'>
			<div className='rs-flex rs-flex-col rs-gap-1'>
				<label className='rs-text-lg rs-font-semibold' htmlFor={key}>
					{label}
				</label>
				{description ? (
					<span className='rs-text-sm rs-text-gray-600 dark:rs-text-gray-400'>
						{description}
					</span>
				) : null}
			</div>
			<input
				className='rs-h-12 rs-w-full rs-rounded-md rs-border rs-border-gray-100 dark:rs-border-gray-800 rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
				defaultValue={defaultValue}
				id={key}
				name={key}
				type='text'
			/>
		</div>
	)
}
