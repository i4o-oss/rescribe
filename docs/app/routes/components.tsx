import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Layout, getMdxHeadings } from 'rescribe'

export async function loader({ request }: LoaderArgs) {
	const headings = await getMdxHeadings(request)
	return json({ headings })
}

export default function Components() {
	const data = useLoaderData()

	return (
		<Layout data={data}>
			<Outlet />
		</Layout>
	)
}
