import { Switch } from '@i4o/catalystui'

import type { BooleanField } from '../types'

type Props = BooleanField & {
	key: string
}

export default function Boolean({
	defaultChecked = false,
	label,
	description,
	key,
}: Props) {
	return (
		<div className='rs-flex rs-w-full rs-items-center rs-justify-between rs-gap-4'>
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
			<Switch defaultChecked={defaultChecked} name={key} />
		</div>
	)
}
