import { Children, ReactElement, useState } from 'react'

import type { TabGroupProps, TabProps } from '../types'

// TODO: Replace any with better types here

function Tab({ children, activeTab, currentTab, setActiveTab }: TabProps) {
	return (
		<div
			className={`${
				activeTab === currentTab
					? 'border-brand-500'
					: 'border-transparent'
			} cursor-pointer border-b py-2 px-4`}
			onClick={() => setActiveTab(currentTab)}
		>
			{children}
		</div>
	)
}

Tab.displayName = 'Tab'

function TabGroup({ children }: TabGroupProps) {
	function findActiveTab(a: any) {
		return a.reduce(
			(accumulator: number, currentValue: ReactElement, i: number) => {
				if (currentValue.props.active) {
					return i
				}

				return accumulator
			},
			0
		)
	}

	const [activeTab, setActiveTab] = useState(findActiveTab(children))

	function validateTab({ type }: { type: any }) {
		return type.displayName === 'Tab'
	}

	return (
		<>
			<div className='flex items-center gap-4 border-b border-gray-100 dark:border-gray-800'>
				{Children.map(children, (item: ReactElement, index: number) => (
					<>
						{validateTab(item) ? (
							<Tab
								key={`tab-${index}`}
								currentTab={index}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								title={item?.props?.title}
							>
								{item?.props?.title}
							</Tab>
						) : null}
					</>
				))}
			</div>
			<div>
				{Children.map(children, (item: ReactElement, index: number) => (
					<div
						className={`${
							index === activeTab ? 'visible' : 'hidden'
						}`}
						key={`tab-content-${index}`}
					>
						{item.props.children}
					</div>
				))}
			</div>
		</>
	)
}

export { Tab, TabGroup }
