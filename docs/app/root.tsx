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

import rescribeStylesheet from '@rescribe/core/rescribe.css'
import { RescribeProvider } from '@rescribe/docs'
import rescribeOldStylesheet from '@rescribe/docs/main.css'
import stylesheet from '~/main.css'
import { rescribeConfig } from '~/rescribe.config'
import { ThemeHead, ThemeProvider, useTheme } from '~/utils/theme-provider'
import { getThemeSession } from '~/utils/theme.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: rescribeOldStylesheet },
	{ rel: 'stylesheet', href: rescribeStylesheet },
	{ rel: 'stylesheet', href: stylesheet },
]

// @ts-ignore
export const meta: MetaFunction = () => [
	{
		charSet: 'utf-8',
	},
	{
		name: 'msapplication-TileColor',
		content: '#2cb67d',
	},
	{
		property: 'og:site',
		content: 'https://rescribe.site',
	},
	{
		property: 'og:url',
		content: 'https://rescribe.site',
	},
	{
		property: 'og:title',
		content: 'Rescribe',
	},
	{
		property: 'og:description',
		content: '',
	},
	{
		property: 'og:image',
		content: '/images/aurelius_open_graph.png',
	},
	{
		name: 'theme-color',
		content: '#090909',
	},
	{
		title: 'Rescribe',
	},
	{
		name: 'description',
		content: '',
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image',
	},
	{
		name: 'twitter:site',
		content: '@i4o_dev',
	},
	{
		name: 'twitter:url',
		content: 'https://rescribe.site/',
	},
	{
		name: 'twitter:creator',
		content: '@i4o_dev',
	},
	{
		name: 'twitter:title',
		content: 'Rescribe',
	},
	{
		name: 'twitter:description',
		content: '',
	},
	{
		name: 'twitter:image',
		content: 'https://www.aurelius.ink/images/aurelius_open_graph.png',
	},
	{
		name: 'viewport',
		content: 'width=device-width,initial-scale=1',
	},
]

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
			<body className='h-full w-full bg-white dark:bg-[#090909]'>
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
