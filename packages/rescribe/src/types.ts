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
