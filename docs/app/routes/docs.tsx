import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Layout, getMdxHeadings } from 'rescribe'

export async function loader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const headings = await getMdxHeadings(url.pathname)
	return json({ headings })
}

export default function Docs() {
	const data = useLoaderData()

	return (
		<Layout data={data}>
			<Outlet />
		</Layout>
	)
}
