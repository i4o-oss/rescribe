import { useLocation } from '@remix-run/react'

import { parseOutputPathname } from '@rescribe/core'
import { useMemo } from 'react'

export default function DocsOutlet() {
	const location = useLocation()
	const params = useMemo(
		() => parseOutputPathname({ pathname: location.pathname }),
		[location.pathname]
	)

	if (params?.collection && params?.root) {
		return <div>Docs Root</div>
	} else if (params?.collection && params.slug) {
		return <div>Docs Page - {params.slug}</div>
	}

	return null
}
