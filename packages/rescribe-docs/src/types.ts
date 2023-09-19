import type { LoaderArgs } from '@remix-run/node'

import type { Collections, Config } from '@rescribe/core'
import type { CollectionInterface } from '@rescribe/server'
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'

export type DocsLoaderHandlerArgs = LoaderArgs & {
	docs: CollectionInterface
	docsConfig: RescribeDocsConfig
	rescribeConfig: Config<Collections>
}

interface Socials {
	ariaLabel?: string
	icon: ReactNode
	href: string
}

export interface NavbarConfig {
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

export interface FooterConfig {
	text?: string | ReactNode
	socials?: Socials[]
}

export interface RescribeDocsConfig {
	footer?: FooterConfig
	navbar: NavbarConfig
	sidebar: SidebarConfig
	theme?: {
		darkModeToggle?: ReactNode
	}
}

export interface RescribeProviderProps {
	children: ReactNode
	config: RescribeDocsConfig | undefined
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
	children: ReactElement
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
	children: ReactElement
}
