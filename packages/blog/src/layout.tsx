import { useLocation } from '@remix-run/react'

import type { Collections, Config as RescribeConfig } from '@rescribe/core'
import { parseAdminPathname } from '@rescribe/core'
import { RescribeProvider } from '@rescribe/core'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

interface BlogLayoutProps {
	basePath: string
	children: ReactNode
	config: RescribeConfig<Collections>
}

export default function BlogLayout({
	basePath,
	children,
	config,
}: BlogLayoutProps) {
	const location = useLocation()
	const params = useMemo(
		() => parseAdminPathname({ basePath, pathname: location.pathname }),
		[basePath, location.pathname]
	)

	return <RescribeProvider config={config}>{children}</RescribeProvider>
}
