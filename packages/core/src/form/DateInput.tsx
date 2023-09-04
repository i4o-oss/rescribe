import type { FieldConfig } from '@conform-to/react'
import { Button, DatePicker } from '@i4o/catalystui'
import { format } from 'date-fns'
import { useState } from 'react'

import type { DateField } from '../types'

type Props = DateField & {
	fieldConfig: FieldConfig<any>
}

export default function DateInput({ fieldConfig, ...fieldData }: Props) {
	const [date, setDate] = useState<Date | undefined>(
		new Date(fieldConfig.defaultValue) || new Date()
	)

	return (
		<div className='rs-flex rs-flex-col rs-w-full rs-gap-2'>
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
				className='rs-hidden'
				id={fieldConfig.id}
				name={fieldConfig.name}
				readOnly
				value={date?.toISOString()}
			/>
			<DatePicker
				onDateChange={setDate}
				trigger={
					<Button
						className='!rs-justify-start !rs-bg-transparent hover:!rs-bg-transparent active:!rs-bg-transparent focus:!rs-bg-transparent !rs-border rs-border-subtle !rs-p-4'
						leftIcon={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='rs-w-4 rs-h-4'
							>
								<rect
									width='18'
									height='18'
									x='3'
									y='4'
									rx='2'
									ry='2'
								/>
								<line x1='16' x2='16' y1='2' y2='6' />
								<line x1='8' x2='8' y1='2' y2='6' />
								<line x1='3' x2='21' y1='10' y2='10' />
								<path d='M8 14h.01' />
								<path d='M12 14h.01' />
								<path d='M16 14h.01' />
								<path d='M8 18h.01' />
								<path d='M12 18h.01' />
								<path d='M16 18h.01' />
							</svg>
						}
					>
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				}
			/>
		</div>
	)
}
