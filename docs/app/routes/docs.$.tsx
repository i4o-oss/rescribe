import type { LoaderFunctionArgs } from '@remix-run/node'

import { DocsOutlet } from '@rescribejs/docs'
import {
	configObj as config,
	rescribeDocsConfig as docsConfig,
} from '~/rescribe.config'
import { handleRescribeDocsLoader } from '~/utils/rescribe.server'

export async function loader(args: LoaderFunctionArgs) {
	return handleRescribeDocsLoader({ ...args, config })
}

export default function DocsRoot() {
	return <DocsOutlet context={{ docsConfig }} />
}
