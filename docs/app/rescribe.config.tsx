import type { RescribeConfig } from 'rescribe'
import { Switch } from '@i4o-oss/catalystui'
import { Theme, useTheme } from '~/utils/theme-provider'
import {
	DashboardIcon,
	FileTextIcon,
	GitHubLogoIcon,
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
	logo: 'https://raw.githubusercontent.com/i4o-oss/rescribe/main/docs/public/rescribe_logo.png',
	sidebar: {
		links: [
			{
				href: '/docs',
				icon: <FileTextIcon className='h-4 w-4' />,
				label: 'Documentation',
			},
			{
				href: '/components',
				icon: <DashboardIcon className='h-4 w-4' />,
				label: 'Components',
			},
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
						'getting-started': 'Getting Started',
						roadmap: 'Roadmap',
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
					group: 'Utilities',
					pages: {},
				},
				{
					group: 'Integrations',
					pages: {
						shiki: 'Syntax Highlighting with Shiki',
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
