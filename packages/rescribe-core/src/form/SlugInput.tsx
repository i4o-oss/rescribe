import type { FieldConfig } from '@conform-to/react'

import type { SlugField } from '../types'

type Props = SlugField & {
	fieldConfig: FieldConfig<any>
}
// TODO: generate slug from title field

export default function SlugInput({ fieldConfig, ...fieldData }: Props) {
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
			<input
				className='rs-h-12 rs-w-full rs-rounded-md rs-border rs-border-subtle rs-bg-transparent rs-px-4 rs-py-2 rs-font-medium'
				defaultValue={fieldConfig.defaultValue}
				id={fieldConfig.id}
				name={fieldConfig.name}
				type='text'
			/>
		</div>
	)
}
