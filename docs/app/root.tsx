import type {
	LinksFunction,
	LoaderArgs,
	MetaFunction,
	SerializeFrom,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import { RescribeProvider } from 'rescribe'
import config from '~/rescribe.config'
import stylesheet from '~/main.css'
import rescribeStylesheet from 'rescribe/main.css'
import { ThemeHead, ThemeProvider, useTheme } from './utils/theme-provider'
import { getThemeSession } from './utils/theme.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'stylesheet', href: rescribeStylesheet },
]

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export type LoaderData = SerializeFrom<typeof loader>

export async function loader({ request }: LoaderArgs) {
	const themeSession = await getThemeSession(request)
	return json({
		theme: themeSession.getTheme(),
	})
}

function App() {
	const data = useLoaderData<LoaderData>()
	const [theme] = useTheme()

	return (
		<html lang='en' className={`h-screen w-screen ${theme ?? ''}`}>
			<head>
				<Meta />
				<Links />
				<ThemeHead ssrTheme={Boolean(data.theme)} />
			</head>
			<body className='h-full w-full bg-white dark:bg-[#040303]'>
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

export default function AppWithProviders() {
	const data = useLoaderData<LoaderData>()
	return (
		<ThemeProvider specifiedTheme={data.theme}>
			<App />
		</ThemeProvider>
	)
}
