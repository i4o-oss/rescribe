import { Rescribe } from '@rescribe/core'
import { configObj } from '~/rescribe.config'

export default function RescribeRoot() {
	return <Rescribe config={configObj} />
}
