import type { AccordionGroupProps, AccordionProps } from '../types'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Children, ReactElement, useState } from 'react'

// TODO: Replace any with better types here

function Accordion({
	children,
	defaultOpen = false,
	index = 0,
	length = 1,
	title,
}: AccordionProps) {
	const [open, setOpen] = useState(defaultOpen || false)
	return (
		<div
			className={`flex flex-col border ${
				open ? 'rounded-t-lg' : 'rounded-lg'
			} ${
				index !== length - 1 && length > 1
					? 'rounded-b-none'
					: 'rounded-t-none rounded-b-lg'
			} ${
				index !== 0 && length > 1
					? '-mt-[1px] rounded-t-none'
					: 'rounded-b-none'
			} ${length === 1 ? 'rounded-t-lg rounded-b-lg' : ''}`}
		>
			<div
				className={`flex cursor-pointer items-center gap-2 px-4 py-2 ${
					open ? 'border-b' : ''
				}`}
				onClick={() => setOpen(!open)}
			>
				<ChevronRightIcon
					className={`transition-transform duration-200 ${
						open ? 'rotate-90' : ''
					}`}
				/>
				{title}
			</div>
			<div className={`px-4 py-2 ${open ? 'visible' : 'hidden'}`}>
				{children}
			</div>
		</div>
	)
}

Accordion.displayName = 'Accordion'

function AccordionGroup({ children }: AccordionGroupProps) {
	function validateAccordion({ type }: { type: any }) {
		return type.displayName === 'Accordion'
	}

	return (
		<>
			<div>
				{Children.count(children) > 1 ? (
					Children.map(
						children,
						(item: ReactElement, index: number) => {
							return (
								<>
									{validateAccordion(item) ? (
										<div>
											<Accordion
												defaultOpen={
													item.props.defaultOpen
												}
												index={index}
												length={Children.count(
													children
												)}
												title={item.props.title}
												key={`accordion-${index}`}
											>
												{item.props.children}
											</Accordion>
										</div>
									) : null}
								</>
							)
						}
					)
				) : (
					<>
						{validateAccordion(children) ? (
							<Accordion
								defaultOpen={children.props.defaultOpen}
								title={children.props.title}
							>
								{children.props.children}
							</Accordion>
						) : null}
					</>
				)}
			</div>
		</>
	)
}

export { Accordion, AccordionGroup }
