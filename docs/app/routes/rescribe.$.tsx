import type { ActionArgs, LoaderArgs } from '@remix-run/node'

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
	return <Rescribe config={config} />
}
