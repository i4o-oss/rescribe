/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	future: {
		v2_dev: true,
		v2_errorBoundary: true,
		v2_headers: true,
		v2_meta: true,
		v2_normalizeFormMethod: true,
		v2_routeConvention: true,
	},
	postcss: true,
	tailwind: true,
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
	watchPaths: ['../packages/'],
}
