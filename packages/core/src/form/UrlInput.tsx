import type { FieldConfig } from '@conform-to/react'

import type { UrlField } from '../types'

type Props = UrlField & {
	fieldConfig: FieldConfig<any>
}
// TODO: validate if string is a url

export default function UrlInput({ fieldConfig, ...fieldData }: Props) {
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
