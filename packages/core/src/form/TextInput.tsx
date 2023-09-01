import type { FieldConfig } from '@conform-to/react'

import type { TextField } from '../types'

type Props = TextField & {
	fieldConfig: FieldConfig<any>
	isTitleField?: boolean
}

// TODO: if multiline is true, return a textarea
export default function TextInput({
	fieldConfig,
	isTitleField = false,
	...fieldData
}: Props) {
	if (isTitleField) {
		return (
			<div className='rs-w-full rs-max-w-3xl'>
				<textarea
					autoFocus
					className='rs-min-h-[1.5rem] rs-w-full rs-resize-none rs-overflow-y-hidden rs-bg-transparent rs-text-2xl rs-font-semibold rs-leading-snug rs-text-foreground focus:rs-outline-none lg:rs-min-h-[6rem] lg:rs-text-5xl'
					defaultValue={fieldConfig.defaultValue}
					id={fieldConfig.id}
					name={fieldConfig.name}
					placeholder={fieldData.description}
					rows={1}
				/>
			</div>
		)
	}

	return (
		<div className='rs-flex rs-w-full rs-flex-col rs-gap-2'>
			<div className='rs-flex rs-flex-col rs-gap-1'>
				<label className='rs-font-semibold' htmlFor={fieldConfig.id}>
					{fieldData.label}
				</label>
				{fieldData.description ? (
					<span className='rs-text-sm rs-text-foreground-subtle'>
						{fieldData.description}
					</span>
				) : null}
			</div>
			{fieldData.multiline ? (
				<textarea
					className='rs-min-h-[6rem] rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
					defaultValue={fieldConfig.defaultValue}
					id={fieldConfig.id}
					name={fieldConfig.name}
					rows={1}
				/>
			) : (
				<input
					className='rs-h-12 rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
					defaultValue={fieldConfig.defaultValue}
					id={fieldConfig.id}
					name={fieldConfig.name}
					type='text'
				/>
			)}
		</div>
	)
}
