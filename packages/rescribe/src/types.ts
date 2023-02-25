import type { ReactNode } from 'react'

interface NavbarConfig {
	search?: boolean
}

export interface SidebarLink {
	external?: true
	href: string
	icon?: ReactNode
	label: string | ReactNode
}

interface SidebarConfig {
	links?: SidebarLink[]
	navigation: Record<string, unknown>
	search?: boolean
}

export interface RescribeConfig {
	logo: string | ReactNode
	navbar?: NavbarConfig
	sidebar?: SidebarConfig
	theme?: {
		darkModeToggle?: ReactNode
	}
}

export interface RescribeProviderProps {
	children: ReactNode
	config: RescribeConfig
}

export interface RescribeDataProviderProps {
	children: ReactNode
	data: any
}

export interface MdxFile {
	base: string
	path: string
	route: string
	data?: unknown
}

export interface Folder {
	base: string
	path: string
	route: string
	children?: Array<MdxFile>
}
