import type {
	LinksFunction,
	LoaderFunctionArgs,
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

import rescribeDocsStylesheet from '@rescribejs/docs/main.css'
import stylesheet from '~/main.css'
import { ThemeHead, ThemeProvider, useTheme } from '~/utils/theme-provider'
import { getThemeSession } from '~/utils/theme.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: rescribeDocsStylesheet },
	{ rel: 'stylesheet', href: stylesheet },
]

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

export async function loader({ request }: LoaderFunctionArgs) {
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
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
				<ThemeHead ssrTheme={Boolean(data.theme)} />
			</head>
			<body className='h-full w-full bg-white dark:bg-[#090909]'>
				<Outlet />
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
