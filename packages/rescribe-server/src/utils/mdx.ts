import { createProcessor } from '@mdx-js/mdx'
import type { VFile } from '@mdx-js/mdx/lib/compile'
import { promises as fsp } from 'node:fs'

import remarkHeadings from './plugins/remark-headings'

async function readCurrentMdx({ path }: { path: string }): Promise<VFile> {
	const input = await fsp.readFile(path, 'utf8')
	const processor = createProcessor({
		remarkPlugins: [remarkHeadings],
	})
	const vfile = await processor.process(input)

	return vfile
}

async function getMdxHeadings(path: string) {
	const vfile = await readCurrentMdx({ path })
	const {
		data: { headings: h },
	} = vfile

	// TODO: Fix this type later
	// @ts-ignore
	const headings = h.filter((heading) => heading.depth > 1).slice(1)

	return headings
}

export { getMdxHeadings }
