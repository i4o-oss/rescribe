import type { ReactNode } from 'react'

interface NavbarConfig {
	search?: boolean
}

export interface SidebarLink {
	label: string | ReactNode
	href: string
	external?: true
}

interface SidebarConfig {
	links?: SidebarLink[]
	search?: boolean
}

export interface RescribeConfig {
	logo: string | ReactNode
	navbar?: NavbarConfig
	sidebar?: SidebarConfig
}

export interface RescribeProviderProps {
	children: ReactNode
	config: RescribeConfig
}
