import type { LoaderArgs } from '@remix-run/node'
import { handleLoader, Rescribe } from '@rescribe/core'
import { configObj as config } from '~/rescribe.config'

export function loader(args: LoaderArgs) {
	return handleLoader({ ...args, config })
}

export default function RescribeRoot() {
	return <Rescribe config={config} />
}
