import { useState } from 'react'
import { AccordionGroupProps, AccordionProps } from '../types'

function Accordion({
	children,
	defaultOpen,
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
				className={`flex items-center px-4 py-2 ${
					open ? 'border-b' : ''
				}`}
				onClick={() => setOpen(!open)}
			>
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
	function validateAccordion(accordion) {
		return accordion.type.displayName === 'Accordion'
	}

	return (
		<>
			<div>
				{children?.length > 1 ? (
					children?.map((item, index: number) => {
						return (
							<>
								{validateAccordion(item) ? (
									<div>
										<Accordion
											defaultOpen={item.props.defaultOpen}
											index={index}
											length={children.length}
											title={item.props.title}
											key={`accordion-${index}`}
										>
											{item.props.children}
										</Accordion>
									</div>
								) : null}
							</>
						)
					})
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
