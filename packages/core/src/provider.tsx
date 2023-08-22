import type { Config } from './types'
import type { ReactNode } from 'react'
import { createContext } from 'react'

export const ConfigContext = createContext<Config<any>>({ collections: {} })

export function ConfigProvider({
	children,
	config,
}: {
	children: ReactNode
	config: Config<any>
}) {
	return (
		<ConfigContext.Provider value={config}>
			{children}
		</ConfigContext.Provider>
	)
}
