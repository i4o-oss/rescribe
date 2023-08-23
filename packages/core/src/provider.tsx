import type { Collections, Config } from './types'
import type { ReactNode } from 'react'
import { createContext } from 'react'

export const ConfigContext = createContext<Config<Collections>>({
	collections: {},
})

export function ConfigProvider({
	children,
	config,
}: {
	children: ReactNode
	config: Config<Collections>
}) {
	return (
		<ConfigContext.Provider value={config}>
			{children}
		</ConfigContext.Provider>
	)
}
