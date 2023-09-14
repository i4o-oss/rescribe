import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { DocsOutlet, Footer, Navbar } from '@rescribe/docs'

export async function loader({ request }: LoaderArgs) {
	// const headings = await getMdxHeadingsForV2Routes(request)
	return json({})
}

// temp fix for https://github.com/i4o-oss/rescribe/issues/1
// this is needed to force revalidation on client-side navigation
// export function shouldRevalidate() {
//     return true
// }

export default function DocsRoot() {
	return (
		<>
			<Navbar />
			<DocsOutlet />
			<Footer />
		</>
	)
}
