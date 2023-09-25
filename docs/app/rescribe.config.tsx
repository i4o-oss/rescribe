import { Switch } from '@i4o/catalystui'
import {
	FileTextIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { collection, config, fields } from '@rescribejs/core'
import type { RescribeDocsConfig } from '@rescribejs/docs'
import { Theme, useTheme } from '~/utils/theme-provider'

export const configObj = config({
	collections: {
		docs: collection({
			format: 'mdx',
			label: 'Docs',
			slug: 'docs',
			path: 'content/docs/*',
			schema: {
				title: fields.text({
					label: 'Title',
					description: 'Page Title',
				}),
				content: fields.document({
					label: 'Content',
				}),
				slug: fields.slug({
					label: 'Page URL',
					description: 'URL of the page',
				}),
			},
		}),
		blog: collection({
			format: 'mdx',
			label: 'Blog',
			slug: 'blog',
			path: 'content/blog/*',
			schema: {
				title: fields.text({
					label: 'Title',
					description: 'Title',
				}),
				content: fields.document({
					label: 'Content',
				}),
				slug: fields.slug({
					label: 'Post URL',
					description: 'URL of the post',
				}),
				excerpt: fields.text({
					label: 'Excerpt',
					description: 'A short description of the post',
					multiline: true,
				}),
				published: fields.boolean({
					label: 'Publish Post',
					description:
						'If the post should be published. Post will be saved as a draft by default.',
				}),
				publishedAt: fields.date({
					label: 'Publish Date',
					description: 'Set the publish date of the post',
				}),
			},
		}),
	},
})

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

export const rescribeDocsConfig: RescribeDocsConfig = {
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
		logo: (
			<span className='inline-flex items-center gap-2'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='text-brand w-6 h-6'
				>
					<rect width='7' height='9' x='3' y='3' rx='1' />
					<rect width='7' height='5' x='14' y='3' rx='1' />
					<rect width='7' height='9' x='14' y='12' rx='1' />
					<rect width='7' height='5' x='3' y='16' rx='1' />
				</svg>
				<span className='text-base font-semibold'>rescribe</span>
			</span>
		),
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
					title: 'Overview',
					pages: {
						index: 'Introduction',
						installation: 'Installation',
						// development: 'Development',
						roadmap: 'Roadmap',
					},
				},
				{
					title: 'Core Concepts',
					pages: {
						config: 'Configuration',
						collections: 'Collections',
						admin: 'Admin UI',
						client: 'Client API',
						'example-config': 'Example Configuration',
					},
				},
				{
					title: 'Fields API',
					pages: {
						'fields/boolean': 'Boolean Field',
						'fields/date': 'Date Field',
						'fields/document': 'Document Field',
						'fields/slug': 'Slug Field',
						'fields/text': 'Text Field',
						'fields/url': 'URL Field',
					},
				},
				{
					title: 'Templates',
					pages: {
						'docs-template': 'Docs',
						'blog-template': 'Blog',
					},
				},
				{
					title: 'Blog Template',
					pages: {
						'blog-template/outlet': 'Outlet',
					},
				},
				{
					title: 'Docs Template',
					pages: {
						'docs-template/configuration': 'Configuration',
						'docs-template/outlet': 'Outlet',
						'docs-template/components': 'Components',
						// 'docs-template/footer': 'Footer',
						// 'docs-template/sidebar': 'Sidebar',
						// 'docs-template/theme': 'Theme',
					},
				},
				// {
				// 	title: 'Components',
				// 	pages: {
				// 		accordion: 'Accordion',
				// 		callout: 'Callout',
				// 		cards: 'Cards',
				// 		'card-title': 'Card Group',
				// 		list: 'List',
				// 		tabs: 'Tabs',
				// 	},
				// },
				{
					title: 'More',
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
