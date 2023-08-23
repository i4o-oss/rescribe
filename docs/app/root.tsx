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

import { RescribeProvider } from '@i4o/rescribe'
import rescribeStylesheet from '@i4o/rescribe/main.css'
import rescribeCoreStylesheet from '@rescribe/core/rescribe.css'
import stylesheet from '~/main.css'
import { rescribeConfig } from '~/rescribe.config'
import { ThemeHead, ThemeProvider, useTheme } from '~/utils/theme-provider'
import { getThemeSession } from '~/utils/theme.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'stylesheet', href: rescribeStylesheet },
	{ rel: 'stylesheet', href: rescribeCoreStylesheet },
]

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
	'msapplication-TileColor': '#2b5797',
	'og:site': 'https://rescribe.site',
	'og:url': 'https://rescribe.site',
	'og:title': 'Rescribe — Simple, open-source site generator for Remix.',
	'og:description': '',
	'og:image': '',
	'theme-color': '#ffffff',
	title: 'Rescribe — Simple, open-source site generator for Remix.',
	'twitter:card': 'summary_large_image',
	'twitter:site': '@i4o_dev',
	'twitter:url': 'https://rescribe.site',
	'twitter:creator': '@i4o_dev',
	'twitter:title': 'Rescribe',
	'twitter:description': '',
	'twitter:image': '',
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
		<html
			lang='en'
			className={`h-screen w-screen ${theme ?? ''} rs-${theme}`}
		>
			<head>
				<Meta />
				<Links />
				<ThemeHead ssrTheme={Boolean(data.theme)} />
			</head>
			<body className='h-full w-full bg-white dark:bg-[#010101]'>
				<RescribeProvider config={rescribeConfig}>
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
