import { Link } from '@remix-run/react'

import { CopyToClipboard, PrimaryButton } from '@i4o/catalystui'
import {
	CheckCircledIcon,
	DashboardIcon,
	GlobeIcon,
	HeartFilledIcon,
	MagnifyingGlassIcon,
	MixIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons'
import { Footer, Navbar } from '@rescribejs/docs'
import { rescribeDocsConfig } from '~/rescribe.config'

const features = [
	{
		name: 'Easy Integration',
		description:
			'Copy-paste some code, write a bit of configuration, and you have a CMS in minutes.',
		icon: CheckCircledIcon,
	},
	{
		name: 'Built for Remix',
		description:
			"Rescribe leverages Remix's amazing features to help you build content experiences fast.",
		icon: HeartFilledIcon,
	},
	{
		name: 'Powered by Markdown/MDX',
		description:
			'Effortlessly write your content in markdown or MDX and save them to your local system.',
		icon: Pencil1Icon,
	},
	{
		name: 'Docs & Blog Themes',
		description:
			'Rescribe has packages for building documentation and blog sites. More themes coming soon.',
		icon: DashboardIcon,
	},
	{
		name: 'Written in TypeScript',
		description:
			'Get autocomplete for your configuration and runtime validation for your content with Zod.',
		icon: DashboardIcon,
	},
	{
		name: 'Out-of-the-box components (coming soon)',
		description:
			'Enhance the UX of your docs site with components like Cards, Callouts, and more.',
		icon: DashboardIcon,
	},
	// {
	// 	name: 'Zero-config full-text search (coming soon)',
	// 	description:
	// 		'Give your users blazing fast full-text search without writing any code.',
	// 	icon: MagnifyingGlassIcon,
	// },
	// {
	// 	name: 'Simple I18n (coming soon)',
	// 	description:
	// 		'Create docs in different languages by naming directories with locales and Rescribe will take care of the rest.',
	// 	icon: GlobeIcon,
	// },
	// {
	// 	name: 'Versioning (coming soon)',
	// 	description:
	// 		'Maintain different versions of your docs for your apps, APIs, or libraries.',
	// 	icon: MixIcon,
	// },
]

export default function Home() {
	return (
		<>
			<Navbar
				navbarConfig={rescribeDocsConfig.navbar}
				themeConfig={rescribeDocsConfig.theme}
			/>
			<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col '>
				<div className='isolate w-full'>
					<div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
						<svg
							className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
							viewBox='0 0 1155 678'
						>
							<path
								fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
								fillOpacity='.3'
								d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
							/>
							<defs>
								<linearGradient
									id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
									x1='1155.49'
									x2='-78.208'
									y1='.177'
									y2='474.645'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#124A33' />
									<stop offset={1} stopColor='#2cb67d' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<main className='w-full'>
						<div className='relative mx-auto flex w-full max-w-5xl justify-center px-6 lg:px-8'>
							<div className='w-full max-w-2xl py-20 sm:py-32 lg:py-40'>
								<div className='text-center'>
									<h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-tight'>
										Content Management for your Remix site
									</h1>
									<p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
										Rescribe embeds a content manager right
										in your codebase. Write content in an
										admin UI right in your site and publish
										them to your users with ease.
									</p>
									<div className='mt-10 flex items-center justify-center gap-x-6'>
										<Link to='/docs'>
											<PrimaryButton
												className='h-12'
												padding='px-8'
												textSize='text-base'
											>
												Get Started
											</PrimaryButton>
										</Link>

										<pre className='flex h-12 items-center justify-between space-x-2 rounded-lg border border-slate-100 bg-white !pl-4 !pr-2 dark:border-slate-700 dark:bg-[#040303]'>
											<code className='flex w-full items-center justify-between font-mono text-sm font-semibold text-slate-900 dark:text-slate-50 gap-x-3'>
												pnpm add @rescribejs/core
												@rescribejs/server
												<CopyToClipboard text='pnpm add @rescribejs/core @rescribejs/server' />
											</code>
										</pre>
									</div>
								</div>
							</div>
							<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
								<svg
									className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
									viewBox='0 0 1155 678'
								>
									<path
										fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
										fillOpacity='.3'
										d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
									/>
									<defs>
										<linearGradient
											id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
											x1='1155.49'
											x2='-78.208'
											y1='.177'
											y2='474.645'
											gradientUnits='userSpaceOnUse'
										>
											<stop stopColor='#124A33' />
											<stop
												offset={1}
												stopColor='#2cb67d'
											/>
										</linearGradient>
									</defs>
								</svg>
							</div>
						</div>
					</main>
				</div>
				<div className='py-24 sm:py-32'>
					<div className='mx-auto max-w-7xl px-6 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:text-center'>
							<h2 className='text-brand-500 text-base font-semibold leading-7'>
								Build sites faster
							</h2>
							<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-tight'>
								Everything you need to build excellent content
								sites
							</p>
							{/* <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'> */}
							{/* 	Quis tellus eget adipiscing convallis sit sit */}
							{/* 	eget aliquet quis. Suspendisse eget egestas a */}
							{/* 	elementum pulvinar et feugiat blandit at. In mi */}
							{/* 	viverra elit nunc. */}
							{/* </p> */}
						</div>
						<div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl'>
							<dl className='grid max-w-xl grid-cols-2 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
								{features.map((feature) => (
									<div
										key={feature.name}
										className='relative pl-16'
									>
										<dt className='text-base font-semibold leading-7 text-gray-900 dark:text-gray-100'>
											<div className='bg-brand-500 absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg'>
												<feature.icon
													className='h-5 w-5 text-white'
													aria-hidden='true'
												/>
											</div>
											{feature.name}
										</dt>
										<dd className='mt-2 text-base leading-7 text-gray-600 dark:text-gray-300'>
											{feature.description}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
			</div>
			<Footer footerConfig={rescribeDocsConfig.footer} />
		</>
	)
}
