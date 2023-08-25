import { Switch } from '@i4o/catalystui'

import type { BooleanField } from '../types'

type Props = BooleanField & {
	schemaKey: string
}

export default function Boolean({
	defaultChecked = false,
	description,
	label,
	schemaKey,
}: Props) {
	return (
		<div className='rs-flex rs-w-full rs-items-center rs-justify-between rs-gap-2'>
			<div className='rs-flex rs-flex-col rs-gap-1'>
				<label className='rs-font-semibold' htmlFor={schemaKey}>
					{label}
				</label>
				{description ? (
					<span className='rs-text-sm rs-text-foreground-subtle'>
						{description}
					</span>
				) : null}
			</div>
			<Switch defaultChecked={defaultChecked} name={schemaKey} />
		</div>
	)
}
