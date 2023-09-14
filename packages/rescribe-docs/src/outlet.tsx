import { useLocation } from '@remix-run/react'

import { parseOutputPathname } from '@rescribe/core'
import { useMemo } from 'react'

import RescribeProvider from './core/provider'
import { Footer, Navbar } from './internal'
import Container from './internal/container'

type DocsOutletContext = {
	docsConfig: any
}

type DocsOutletProps = {
	context: DocsOutletContext
}

export default function DocsOutlet({ context }: DocsOutletProps) {
	const location = useLocation()
	const params = useMemo(
		() => parseOutputPathname({ pathname: location.pathname }),
		[location.pathname]
	)

	if (params?.root) {
		return (
			<RescribeProvider config={context.docsConfig}>
				<Navbar />
				<Container>
					<div>Docs Root</div>
				</Container>
				<Footer />
			</RescribeProvider>
		)
	} else if (params?.slug) {
		return (
			<RescribeProvider config={context.docsConfig}>
				<Navbar />
				<Container>
					<div>Docs Page - {params.slug}</div>
				</Container>
				<Footer />
			</RescribeProvider>
		)
	}

	return null
}
