import type { ReactNode } from 'react'
import { createContext } from 'react'

import type { parseAdminPathname } from './helpers'
import type {
	Collection,
	Collections,
	Config,
	EditorProviderData,
	RescribeData,
} from './types'

export const CollectionContext = createContext<Collection | null>(null)

export function CollectionProvider({
	children,
	config,
	params,
}: {
	children: ReactNode
	config: Config<Collections>
	params: ReturnType<typeof parseAdminPathname>
}) {
	const collection = params?.collection
		? config.collections[params.collection]
		: null

	return (
		<CollectionContext.Provider value={collection}>
			{children}
		</CollectionContext.Provider>
	)
}

export const RescribeContext = createContext<RescribeData | undefined>(
	undefined
)

type RescribeProviderProps = RescribeData & {
	children: ReactNode
}

export function RescribeProvider({ children, config }: RescribeProviderProps) {
	return (
		<RescribeContext.Provider value={{ config }}>
			{children}
		</RescribeContext.Provider>
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
