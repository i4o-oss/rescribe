import { RescribeDocsContext } from '../constants'
import type { RescribeProviderProps } from '../types'

export default function RescribeProvider(props: RescribeProviderProps) {
	return (
		<RescribeDocsContext.Provider value={props.config}>
			{props.children}
		</RescribeDocsContext.Provider>
	)
}
