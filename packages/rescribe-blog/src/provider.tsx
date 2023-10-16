import { RescribeBlogContext } from './constants'
import type { RescribeProviderProps } from './types'

export default function RescribeProvider(props: RescribeProviderProps) {
	return (
		<RescribeBlogContext.Provider value={props.config}>
			{props.children}
		</RescribeBlogContext.Provider>
	)
}
