import type { Dispatch, ReactNode, SetStateAction } from 'react'

interface Socials {
	ariaLabel?: string
	icon: ReactNode
	href: string
}

interface NavbarConfig {
	logo: string | ReactNode
	search?: boolean
	socials?: Socials[]
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

interface FooterConfig {
	text?: string | ReactNode
	socials?: Socials[]
}

export interface RescribeConfig {
	footer?: FooterConfig
	navbar: NavbarConfig
	sidebar: SidebarConfig
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
	data?: unknown
	path: string
	route: string
}

export interface Folder {
	base: string
	children?: Array<MdxFile>
	path: string
	route: string
}

export interface AccordionProps {
	children: string | ReactNode
	defaultOpen: boolean
	title: string | ReactNode
	index?: number
	length?: number
}

export interface AccordionGroupProps {
	children: ReactNode
}

export interface CalloutProps {
	children: ReactNode
	type: 'info' | 'warning' | 'danger' | 'success' | 'tip'
}

export interface CardProps {
	title: string | ReactNode
	description: string | ReactNode
	icon?: ReactNode
	image?: string
	href: string
}

export interface CardGroupProps {
	children: ReactNode
	cols: 1 | 2 | 3
}

interface ListItem {
	title: string
	description: string
	type?: string
	required?: boolean
	default?: string
}

export interface ListProps {
	items: ListItem[]
}

export interface TabProps {
	active?: boolean
	title: string | ReactNode
	children: string | ReactNode
	currentTab: number
	activeTab: number
	setActiveTab: Dispatch<SetStateAction<number>>
}

export interface TabGroupProps {
	children: ReactNode
}
