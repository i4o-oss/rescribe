/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	postcss: true,
	tailwind: true,
	future: {
		v2_dev: true,
		v2_routeConvention: true,
	},
	ignoredRouteFiles: ['**/.*'],
	mdx: async () => {
		const [rehypeSlug] = await Promise.all([
			import('rehype-slug').then((mod) => mod.default),
		])

		return {
			rehypePlugins: [rehypeSlug],
		}
	},
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// serverBuildPath: "build/index.js",
	// publicPath: "/build/",
	serverModuleFormat: 'cjs',
	serverDependenciesToBundle: [/.*/],
	watchPaths: [
		'../packages/rescribe/',
		'../packages/core/',
		'../packages/server/',
	],
}
