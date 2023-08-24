import type { TextField } from '../types'

type Props = TextField & {
	defaultValue?: string
	isTitleField?: boolean
	schemaKey: string
}

// TODO: if multiline is true, return a textarea
export default function TextInput({
	defaultValue = '',
	description,
	isTitleField = false,
	label,
	multiline,
	schemaKey,
}: Props) {
	if (isTitleField) {
		return (
			<div className='rs-w-full rs-max-w-3xl'>
				<textarea
					autoFocus
					className='rs-min-h-[2rem] rs-w-full rs-resize-none rs-overflow-y-hidden rs-bg-transparent rs-text-2xl rs-font-semibold rs-leading-snug rs-text-foreground focus:rs-outline-none lg:rs-min-h-[6rem] lg:rs-text-5xl'
					id={schemaKey}
					name={schemaKey}
					placeholder={description}
					rows={1}
				/>
			</div>
		)
	}

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
			{multiline ? (
				<textarea
					className='rs-min-h-[6rem] rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
					id={schemaKey}
					name={schemaKey}
					rows={1}
				/>
			) : (
				<input
					className='rs-h-12 rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
					defaultValue={defaultValue}
					id={schemaKey}
					name={schemaKey}
					type='text'
				/>
			)}
		</div>
	)
}
