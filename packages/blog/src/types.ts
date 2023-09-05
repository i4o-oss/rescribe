import type { ContentPath } from '@rescribe/core'
import type { ReactNode } from 'react'

export type RescribeBlogConfig = {
	content: ContentPath
}

export type RescribeProviderProps = {
	children: ReactNode
	config: RescribeBlogConfig
}
