import { RescribeDataContext } from '../constants'
import type { RescribeDataProviderProps } from '../types'

export default function RescribeDataProvider(props: RescribeDataProviderProps) {
	return (
		<RescribeDataContext.Provider value={props.data}>
			{props.children}
		</RescribeDataContext.Provider>
	)
}
