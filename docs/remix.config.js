/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	browserNodeBuiltinsPolyfill: {
		modules: { fs: true, path: true, punycode: true },
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
