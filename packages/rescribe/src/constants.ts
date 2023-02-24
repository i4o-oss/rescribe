import path from 'path'
import { createContext } from 'react'
import { RescribeConfig } from './types'

export const REMIX_PROJECT_DIR = process.cwd()

export const REMIX_ROUTES_DIR = path.join(
	process.cwd(),
	'/',
	'app',
	'/',
	'routes'
)

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/

export const LOCALE_REGEX = /\.([a-z]{2}(-[A-Z]{2})?)$/

export const DEFAULT_CONFIG: RescribeConfig = {
	logo: '',
	navbar: {
		search: true,
	},
	sidebar: {
		links: [],
		search: true,
	},
}

export const RescribeContext = createContext(DEFAULT_CONFIG)

export const RescribeDataContext = createContext({})
