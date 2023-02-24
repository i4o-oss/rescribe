import type { VFile } from '@mdx-js/mdx/lib/compile'
import fs from 'graceful-fs'
import path from 'path'
import { promisify } from 'node:util'
// import pLimit from 'p-limit'
import slash from 'slash'
import matter from 'gray-matter'
import { createProcessor } from '@mdx-js/mdx'
import remarkHeadings from './plugins/remark-headings'
import {
	LOCALE_REGEX,
	MARKDOWN_EXTENSION_REGEX,
	REMIX_ROUTES_DIR,
} from '../constants'
import { Folder } from '../types'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
// const limit = pLimit(20)

async function collectMdx(filePath: string) {
	const { locale } = parseFileName(filePath)

	const content = await readFile(filePath, 'utf8')
	const { data } = matter(content)
	return {
		type: 'MdxPage',
		...(locale && { locale }),
		...(Object.keys(data).length && { frontMatter: data }),
	}
}

async function readFilesInDir(
	pathname: string,
	dir = REMIX_ROUTES_DIR,
	route = '/'
): Promise<Array<Folder>> {
	const files = await readdir(dir, { withFileTypes: true })

	const items = await Promise.all(
		files.map(async (f) => {
			const filePath = path.join(dir, f.name)
			const isDir = f.isDirectory()
			const base = path.parse(f.name).base
			const { name, locale, ext } = isDir
				? { name: base, locale: '', ext: '' }
				: parseFileName(filePath)
			const fileRoute = normalizePageRoute(route, name)

			if (pathname.startsWith(fileRoute)) {
				if (isDir) {
					return {
						base,
						path: filePath,
						route: fileRoute,
						children: await readFilesInDir(
							pathname,
							path.join(dir, f.name),
							fileRoute
						),
					}
				}

				if (
					MARKDOWN_EXTENSION_REGEX.test(ext) &&
					fileRoute === pathname
				) {
					return {
						base,
						path: filePath,
						route: fileRoute,
						data: await collectMdx(filePath),
					}
				}
			}
		})
	)

	return items as Array<Folder>
}

async function readCurrentMdx(pathname: string): Promise<VFile> {
	const matchedRoutes = await readFilesInDir(pathname)

	const [matchedRoute] = matchedRoutes?.filter((item) => item)
	// @ts-ignore
	const [currentFile] = matchedRoute?.children?.filter(
		(child: unknown | null) => child
	)
	const input = await readFile(currentFile.path, 'utf8')
	const processor = createProcessor({
		remarkPlugins: [remarkHeadings],
	})
	const vfile = await processor.process(input)

	return vfile
}

async function getMdxHeadings(pathname: string) {
	const vfile = await readCurrentMdx(pathname)
	const {
		data: { headings },
	} = vfile

	return headings
}

function parseFileName(fp: string) {
	const { name, ext } = path.parse(fp)
	const locale = name.match(LOCALE_REGEX)?.[1] || ''

	return {
		name: locale ? name.replace(LOCALE_REGEX, '') : name,
		locale,
		ext,
	}
}

function normalizePageRoute(parentRoute: string, route: string): string {
	return slash(path.join(parentRoute, route.replace(/^index$/, '')))
}

export { getMdxHeadings }
