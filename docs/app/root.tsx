import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import { RescribeProvider } from 'rescribe'
import config from '~/rescribe.config'
import stylesheet from '~/main.css'
import rescribeStylesheet from 'rescribe/main.css'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'stylesheet', href: rescribeStylesheet },
]

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

function Head() {
	return (
		<>
			<Meta />
			<Links />
		</>
	)
}

export default function App() {
	return (
		<html lang='en'>
			<head>
				<Head />
			</head>
			<body>
				<RescribeProvider config={config}>
					<Outlet />
				</RescribeProvider>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
