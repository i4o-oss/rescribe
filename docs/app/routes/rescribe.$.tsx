import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import {
	Link,
	useFetcher,
	useLoaderData,
	useLocation,
	useNavigate,
} from '@remix-run/react'

import { Rescribe } from '@rescribe/core'
import { configObj as config } from '~/rescribe.config'
import {
	handleActionForRescribe,
	handleLoaderForRescribe,
} from '~/utils/rescribe.server'

export function loader(args: LoaderArgs) {
	return handleLoaderForRescribe({ ...args, config })
}

export function action(args: ActionArgs) {
	return handleActionForRescribe({ ...args, config })
}

export default function RescribeRoot() {
	const data = useLoaderData()
	const fetcher = useFetcher()
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<Rescribe
			config={config}
			data={data}
			fetcher={fetcher}
			Link={Link}
			location={location}
			navigate={navigate}
		/>
	)
}
