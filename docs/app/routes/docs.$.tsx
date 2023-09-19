import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { DocsOutlet, Footer, Navbar } from '@rescribejs/docs'
import {
	configObj as config,
	rescribeDocsConfig as docsConfig,
} from '~/rescribe.config'
import { handleRescribeDocsLoader } from '~/utils/rescribe.server'

export async function loader(args: LoaderArgs) {
	return handleRescribeDocsLoader({ ...args, config })
}

// temp fix for https://github.com/i4o-oss/rescribe/issues/1
// this is needed to force revalidation on client-side navigation
// export function shouldRevalidate() {
//     return true
// }

export default function DocsRoot() {
	return <DocsOutlet context={{ docsConfig }} />
}
