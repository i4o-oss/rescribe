import type { RescribeConfig } from '@i4o/rescribe'
import { Switch } from '@i4o/catalystui'
import { Theme, useTheme } from '~/utils/theme-provider'
import {
	DashboardIcon,
	FileTextIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'

function DarkModeToggle() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<Switch
			defaultChecked={theme === Theme.DARK}
			name='theme-switcher'
			onCheckedChange={toggleTheme}
		/>
	)
}

const config: RescribeConfig = {
	footer: {
		socials: [
			{
				ariaLabel: 'Github Repository',
				icon: <GitHubLogoIcon className='h-6 w-6' />,
				href: 'https://github.com/i4o-oss/rescribe',
			},
			{
				ariaLabel: 'Twitter Profile',
				icon: <TwitterLogoIcon className='h-6 w-6' />,
				href: 'https://twitter.com/i4o_dev',
			},
		],
		text: (
			<>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='m7 11 2-2-2-2'></path>
					<path d='M11 13h4'></path>
					<rect
						x='3'
						y='3'
						width='18'
						height='18'
						rx='2'
						ry='2'
					></rect>
				</svg>
				<p>
					Built by{' '}
					<a
						className='underline'
						href='https://i4o.dev'
						target='_blank'
						rel='noreferrer noopener'
					>
						i4o
					</a>
					.
				</p>
			</>
		),
	},
	navbar: {
		logo: 'https://raw.githubusercontent.com/i4o-oss/rescribe/main/docs/public/rescribe_logo.png',
		search: false,
		socials: [
			{
				ariaLabel: 'Github Repository',
				icon: <GitHubLogoIcon className='h-6 w-6' />,
				href: 'https://github.com/i4o-oss/rescribe',
			},
		],
	},
	sidebar: {
		links: [
			{
				href: '/docs',
				icon: <FileTextIcon className='h-4 w-4' />,
				label: 'Documentation',
			},
			// {
			// 	href: '/docs/accordion',
			// 	icon: <DashboardIcon className='h-4 w-4' />,
			// 	label: 'Components',
			// },
			{
				external: true,
				href: 'https://github.com/i4o-oss/rescribe',
				icon: <GitHubLogoIcon className='h-4 w-4' />,
				label: 'Github',
			},
		],
		navigation: {
			docs: [
				{
					group: 'Overview',
					pages: {
						index: 'Introduction',
						// changelog: 'Changelog',
						roadmap: 'Roadmap',
					},
				},
				{
					group: 'Getting Started',
					pages: {
						installation: 'Installation',
						development: 'Development',
					},
				},
				{
					group: 'Configuration',
					pages: {
						'rescribe-provider': 'Rescribe Provider',
						'rescribe-config': 'rescribe.config.tsx',
						navbar: 'Navbar',
						sidebar: 'Sidebar',
						search: 'Search',
						theme: 'Theme',
						footer: 'Footer',
						'example-config': 'Example Configuration',
					},
				},
				{
					group: 'Layouts',
					pages: {
						'docs-layout': 'Docs',
						'blog-layout': 'Blog',
					},
				},
				{
					group: 'Components',
					pages: {
						accordion: 'Accordion',
						callout: 'Callout',
						cards: 'Cards',
						'card-group': 'Card Group',
						list: 'List',
						tabs: 'Tabs',
					},
				},
				{
					group: 'Utilities',
					pages: {
						'get-toc-headings': 'getTocHeadings',
					},
				},
				{
					group: 'More',
					pages: {
						about: 'About',
					},
				},
			],
		},
		search: false,
	},
	theme: {
		darkModeToggle: <DarkModeToggle />,
	},
}

export default config
