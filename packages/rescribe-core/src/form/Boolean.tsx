import type { FieldConfig } from '@conform-to/react'
import { Switch } from '@i4o/catalystui'

import type { BooleanField } from '../types'

type Props = BooleanField & {
	fieldConfig: FieldConfig<any>
}

export default function Boolean({ fieldConfig, ...fieldData }: Props) {
	return (
		<div className='rs-flex rs-w-full rs-items-center rs-justify-between rs-gap-2'>
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
			<Switch
				defaultChecked={
					fieldConfig.defaultValue || fieldData.defaultChecked
				}
				name={fieldConfig.name}
			/>
		</div>
	)
}
