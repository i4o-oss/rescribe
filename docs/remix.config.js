/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    tailwind: true,
	future: {
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
	serverDependenciesToBundle: [/.*/],
	watchPaths: ['../packages/rescribe/'],
}
