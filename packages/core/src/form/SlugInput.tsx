import type { SlugField } from '../types'

type Props = SlugField & {
	defaultValue?: string
	schemaKey: string
}

export default function SlugInput({
	defaultValue,
	description,
	label,
	schemaKey,
}: Props) {
	return (
		<div className='rs-flex rs-w-full rs-flex-col rs-gap-4'>
			<div className='rs-flex rs-flex-col rs-gap-1'>
				<label
					className='rs-text-lg rs-font-semibold'
					htmlFor={schemaKey}
				>
					{label}
				</label>
				{description ? (
					<span className='rs-text-sm rs-text-foreground-subtle'>
						{description}
					</span>
				) : null}
			</div>
			<input
				className='rs-h-12 rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
				defaultValue={defaultValue}
				id={schemaKey}
				name={schemaKey}
				type='text'
			/>
		</div>
	)
}
