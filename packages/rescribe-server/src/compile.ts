export interface BundleMdx {
	source: string
	files?: Record<string, string | Buffer>
}

export async function compileMdx({ source, files }: BundleMdx) {
	// const { code, frontmatter } = await bundleMdx({
	// source,
	// ! some files are Buffers, it works but the type disallow it. ignore for now.
	// @ts-ignore
	// files,
	// mdxOptions: (options) => {
	// 	options.remarkPlugins = [
	// 		...(options.remarkPlugins ?? []),
	// 		// remarkMdxImages,
	// 	]
	//
	// 	options.rehypePlugins = [
	// 		...(options.rehypePlugins ?? []),
	// 		// rehypeSlug,
	// 		// [rehypeAutolinkHeadings, { behavior: 'wrap' }],
	// 	]
	//
	// 	return options
	// },
	// esbuildOptions: (options) => {
	// 	options.loader = {
	// 		...options.loader,
	// 		'.webp': 'file',
	// 		'.png': 'file',
	// 		'.jpg': 'file',
	// 		'.jpeg': 'file',
	// 		'.gif': 'file',
	// 	}
	// 	options.outdir = resolve(publicDir, './generated/assets')
	// 	options.publicPath = '/generated/assets'
	// 	options.write = true
	//
	// 	return options
	// },
	// })

	// const readingTime = calculateReadingTime(source)

	return {
		// code,
		// frontmatter,
		// readingTime,
	}
}
