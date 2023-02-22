import { Layout } from '../components'
import { RescribeContext } from '../constants'
import type { RescribeProviderProps } from '../types'

export default function RescribeProvider(props: RescribeProviderProps) {
	return (
		<RescribeContext.Provider value={props.config}>
			<Layout>{props.children}</Layout>
		</RescribeContext.Provider>
	)
}
