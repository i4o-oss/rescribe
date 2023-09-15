import { ListProps } from '../types'

export default function List({ items }: ListProps) {
	return (
		<ul className='list-none pl-0'>
			{items.length > 0 &&
				items.map((item, index) => (
					<li
						className='border-b border-gray-400 py-4 pl-0 dark:border-gray-600'
						key={`list-item-${index}`}
					>
						<div className='m-0 flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<h4 className='text-brand-500 m-0 inline-flex rounded-md border border-gray-400 px-1 py-0 dark:border-gray-600'>
									{item.title}
								</h4>
								{item.required ? <span>Required</span> : null}
								{item.default ? (
									<span>{`Default: ${item.default}`}</span>
								) : null}
							</div>
							{item.type ? (
								<span className='font-mono text-sm'>
									{item.type}
								</span>
							) : null}
						</div>
						<p className='m-0 mt-2'>{item.description}</p>
					</li>
				))}
		</ul>
	)
}
