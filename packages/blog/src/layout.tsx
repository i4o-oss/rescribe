import type { Collections, Config as RescribeConfig } from '@rescribe/core'
import { RescribeProvider } from '@rescribe/core'
import type { ReactNode } from 'react'

interface BlogLayoutProps {
	children: ReactNode
	config: RescribeConfig<Collections>
}

export default function BlogLayout({ children, config }: BlogLayoutProps) {
	return <RescribeProvider config={config}>{children}</RescribeProvider>
}
