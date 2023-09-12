import { CardGroupProps } from '../types'

export default function CardGroup(props: CardGroupProps) {
	return (
		<div className={`grid grid-cols-${props.cols} gap-4`}>
			{props.children}
		</div>
	)
}
