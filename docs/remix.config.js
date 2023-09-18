/** @type {import('@remix-run/dev').AppConfig} */
export default {
	browserNodeBuiltinsPolyfill: {
		modules: { punycode: true },
	},
	ignoredRouteFiles: ['**/.*'],
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// publicPath: "/build/",
	// serverBuildPath: "build/index.js",
	serverDependenciesToBundle: [/.*/],
}
