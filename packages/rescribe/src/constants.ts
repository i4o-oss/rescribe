import { createContext } from 'react'
import { RescribeConfig } from './types'

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
