import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'

import { REMIX_BASE_PATH, parsePathname } from '@rescribe/core'
import type { Collections, Config } from '@rescribe/core'
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import YAML from 'yaml'
import { zx } from 'zodix'

import {
	generateMarkdownFromHtml,
	generateZodSchema,
	readItemsInCollection,
} from './helpers'

type LoaderHandlerArgs = LoaderArgs & {
	config: Config<Collections>
}

export async function handleLoader({ config, request }: LoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parsePathname(url.pathname)
	const { collections } = config

	if (params === null) {
		return json({})
	} else if (params.collection && !params.action) {
		const collection = collections[params.collection]
		const entries = await readItemsInCollection(collection)
		return json({ entries })
	} else if (params.collection && params.action === 'edit') {
		const collection = collections[params.collection]

		const fullPath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${params.slug}.md`
		const file = await fs.readFile(fullPath, 'utf8')
		const { content, data } = matter(file)

		return json({ frontmatter: data, content })
	} else {
		// params.root === true
		const data = await Promise.all(
			Object.values(collections).map(async (collection) => {
				const fullPath = `${process.cwd()}/${REMIX_BASE_PATH}/${
					collection.path
				}.{md,mdx}`
				const entries = await fg(fullPath, { onlyFiles: true })

				return {
					...collection,
					itemsCount: entries.length,
				}
			})
		)

		return json(data)
	}
}

type ActionHandlerArgs = ActionArgs & {
	config: Config<Collections>
}

export async function handleAction({ config, request }: ActionHandlerArgs) {
	const url = new URL(request.url)
	const params = parsePathname(url.pathname)
	const { collections } = config

	// TODO: data should have at least title and slug to be saved
	if (params?.collection && params.action === 'create') {
		const collection = collections[params.collection]
		const formDataSchema = generateZodSchema(collection.schema)
		const formData = await zx.parseForm(request, formDataSchema)

		const frontmatterObj = {
			title: formData.title,
			slug: formData.slug,
			excerpt: formData.excerpt,
			publishedAt: formData.publishedAt,
			published: formData.published,
		}

		const frontmatter = YAML.stringify(frontmatterObj)
		const markdown = generateMarkdownFromHtml(formData.content)

		// TODO: find a better way to form markdown file content
		const markdownFileContent = `
---
${frontmatter}
---

${markdown}
`

		// TODO: directories have to exist in order to write file. figure out if directories exist and create them.
		// TODO: if slug changes this will create a new file. keep track of old file name and rename or delete + recreate it.
		// TODO: this path only works for files with depth = 1 but glob allows nested directories. figure out how to get a working path regardless of how files are organized.
		const fullPath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${formData.slug}.md`
		await fs.writeFile(fullPath, markdownFileContent)

		return redirect(
			`/rescribe/collections/${params.collection}/${formData.slug}`
		)
	}

	return json({})
}
