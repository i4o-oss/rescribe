import type { RescribeConfig } from 'rescribe'

const config: RescribeConfig = {
	logo: '',
	sidebar: {
		links: [
			{
				label: 'Documentation',
				href: '/docs',
			},
			{
				label: 'Github',
				href: 'https://github.com/i4o-oss/rescribe',
				external: true,
			},
		],
		search: true,
	},
}

export default config
