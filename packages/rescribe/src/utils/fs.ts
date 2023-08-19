import fs from 'fs'
import path from 'path'
import slash from 'slash'
import matter from 'gray-matter'
import { MARKDOWN_EXTENSION_REGEX, REMIX_ROUTES_DIR } from '../constants'
import type { Folder } from '../types'

async function collectMdx(filePath: string) {
	const content = await fs.promises.readFile(filePath, 'utf8')
	const { data } = matter(content)
	return {
		type: 'MdxPage',
		...(Object.keys(data).length && { frontMatter: data }),
	}
}

async function readFilesInDir(
	pathname: string,
	v2 = false,
	dir = REMIX_ROUTES_DIR,
	route = '/'
): Promise<Array<Folder>> {
	const files = await fs.promises.readdir(dir, { withFileTypes: true })

	if (!v2) {
		const items = await Promise.all(
			files.map(async (f) => {
				const filePath = path.join(dir, f.name)
				const isDir = f.isDirectory()
				const base = path.parse(f.name).base
				const { name, ext } = isDir
					? { name: base, ext: '' }
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
								v2,
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
	} else {
		const pathnameParts = pathname.split('/').filter((e) => e !== '')
		const filename = pathnameParts.join('.')
		const items = await Promise.all(
			files.map(async (f) => {
				const filePath = path.join(dir, f.name)
				const base = path.parse(f.name).base
				const { name, ext } = parseFileName(base)
				const fileRoute = normalizePageRoute(route, name)
				if (name === filename && MARKDOWN_EXTENSION_REGEX.test(ext)) {
					return {
						base,
						path: filePath,
						route: fileRoute,
						data: await collectMdx(filePath),
					}
				} else if (
					pathnameParts.length === 1 &&
					name.startsWith(pathnameParts[0]) &&
					name.endsWith('_index')
				) {
					return {
						base,
						path: filePath,
						route: fileRoute,
						data: await collectMdx(filePath),
					}
				}
			})
		)

		return items as Array<Folder>
	}
}

function parseFileName(fp: string) {
	const { name, ext } = path.parse(fp)

	return {
		name: name,
		ext,
	}
}

function normalizePageRoute(parentRoute: string, route: string): string {
	return slash(path.join(parentRoute, route.replace(/^index$/, '')))
}

export { readFilesInDir }
