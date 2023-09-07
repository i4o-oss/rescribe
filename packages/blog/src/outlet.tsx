import { useLocation } from '@remix-run/react'

import { parseOutputPathname } from '@rescribe/core'
import { useMemo } from 'react'

import Posts from './posts'

export default function BlogOutlet() {
	const location = useLocation()
	const params = useMemo(
		() => parseOutputPathname({ pathname: location.pathname }),
		[location.pathname]
	)

	if (params?.collection && params?.root) {
		return <Posts collection={params.collection} />
	} else if (params?.collection && params.slug) {
		return <div>Post Content</div>
	}

	return null
}
