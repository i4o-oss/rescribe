import type { LoaderArgs } from '@remix-run/node'
import { handleLoader, Rescribe } from '@rescribe/core'
import { configObj } from '~/rescribe.config'

export function loader(args: LoaderArgs) {
	return handleLoader(args)
}

export default function RescribeRoot() {
	return <Rescribe config={configObj} />
}
