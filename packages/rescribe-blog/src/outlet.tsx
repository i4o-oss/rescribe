import { useLocation } from '@remix-run/react'

import { parseOutputPathname } from '@rescribejs/core'
import { useContext, useMemo } from 'react'

import { RescribeBlogContext } from './constants'
import Post from './post'
import Posts from './posts'
import RescribeProvider from './provider'
import { RescribeBlogConfig } from './types'

type BlogOutletContext = {
	blogConfig: RescribeBlogConfig
}

type BlogOutletProps = {
	context?: BlogOutletContext
}

export default function BlogOutlet({ context }: BlogOutletProps) {
	const blogConfig = useContext(RescribeBlogContext)
	const config = context?.blogConfig ?? blogConfig
	const location = useLocation()
	const params = useMemo(
		() => parseOutputPathname({ pathname: location.pathname }),
		[location.pathname]
	)

	if (params?.collection && params?.root) {
		return (
			<RescribeProvider config={config}>
				<Posts collection={params.collection} />
			</RescribeProvider>
		)
	} else if (params?.collection && params.slug) {
		return (
			<RescribeProvider config={config}>
				<Post collection={params.collection} />
			</RescribeProvider>
		)
	}

	return null
}
