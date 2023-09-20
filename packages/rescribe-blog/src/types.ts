import type { LoaderFunctionArgs } from '@remix-run/server-runtime'

import type { Collections, Config, ContentPath } from '@rescribejs/core'
import type { CollectionInterface } from '@rescribejs/server'
import type { ReactNode } from 'react'

export type BlogLoaderHandlerArgs = LoaderFunctionArgs & {
	blog: CollectionInterface
	config: Config<Collections>
}

export type RescribeBlogConfig = {
	content: ContentPath
}

export type RescribeProviderProps = {
	children: ReactNode
	config: RescribeBlogConfig
}
