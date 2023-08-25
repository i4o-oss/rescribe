import type { ReactNode } from 'react'
import { createContext } from 'react'

import type { parsePathname } from './helpers'
import type {
	Collection,
	Collections,
	Config,
	EditorProviderData,
} from './types'

export const CollectionContext = createContext<Collection | null>(null)

export function CollectionProvider({
	children,
	config,
	paths,
}: {
	children: ReactNode
	config: Config<Collections>
	paths: ReturnType<typeof parsePathname>
}) {
	const collection = paths?.collection
		? config.collections[paths.collection]
		: null

	return (
		<CollectionContext.Provider value={collection}>
			{children}
		</CollectionContext.Provider>
	)
}

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

export const EditorContext = createContext<EditorProviderData | undefined>(
	undefined
)

type EditorProviderProps = {
	children: ReactNode
	data: EditorProviderData
}

export function EditorProvider({ children, data }: EditorProviderProps) {
	return (
		<EditorContext.Provider value={data}>{children}</EditorContext.Provider>
	)
}
