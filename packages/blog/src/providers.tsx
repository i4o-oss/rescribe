import { createContext } from 'react'

import type { RescribeProviderProps } from './types'

export const RescribeContext = createContext({})

export default function RescribeProvider(props: RescribeProviderProps) {
	return (
		<RescribeContext.Provider value={props.config}>
			{props.children}
		</RescribeContext.Provider>
	)
}
