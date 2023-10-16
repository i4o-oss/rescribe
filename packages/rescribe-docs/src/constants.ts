import { createContext } from 'react'

import { RescribeDocsConfig } from './types'

export const REMIX_ROUTES_DIR = 'app/routes'

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/

export const RescribeDocsContext = createContext<
	RescribeDocsConfig | undefined
>(undefined)
