import { getMdxHeadingsForV2Routes, Layout } from '@i4o/rescribe'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderArgs) {
	const headings = await getMdxHeadingsForV2Routes(request)
	return json({ headings })
}

// temp fix for https://github.com/i4o-oss/rescribe/issues/1
// this is needed to force revalidation on client-side navigation
export function shouldRevalidate() {
	return true
}

export default function Docs() {
	const data = useLoaderData()

	return (
		<Layout data={data}>
			<Outlet />
		</Layout>
	)
}
