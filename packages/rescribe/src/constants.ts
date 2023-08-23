import { RescribeConfig } from './types'
import { createContext } from 'react'

export const REMIX_ROUTES_DIR = 'app/routes'

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/

export const DEFAULT_CONFIG: RescribeConfig = {
	navbar: {
		logo: '',
		search: true,
	},
	sidebar: {
		links: [],
		navigation: {},
		search: true,
	},
}

export const RescribeContext = createContext(DEFAULT_CONFIG)

export const RescribeDataContext = createContext({})
