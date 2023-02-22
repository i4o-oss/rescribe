import { Outlet } from '@remix-run/react'
import { Layout } from 'rescribe'

export default function Docs() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}
