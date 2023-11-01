import type { ActionFunctionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import { parse } from '@conform-to/zod'
import { parseAdminPathname } from '@rescribejs/core'
import type { Collections, Config } from '@rescribejs/core'
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import YAML from 'yaml'

import {
	createSchema,
	getDefaults,
	getPath,
	readItemsInCollection,
} from './helpers'
import type { LoaderHandlerArgs } from './types'

export async function handleLoader({ config, request }: LoaderHandlerArgs) {
	const url = new URL(request.url)
	const params = parseAdminPathname({ pathname: url.pathname })
	const { collections } = config

	if (params === null) {
		return json({})
	} else if (params.collection && !params.action) {
		const collection = collections[params.collection]
		const items = await readItemsInCollection({ collection })
		return json({ items })
	} else if (params.collection && params.action === 'create') {
		const collection = collections[params.collection]
		const schema = createSchema({ collectionSchema: collection.schema })
		const defaults = getDefaults(schema)
		const data = schema.transform((val) => val).parse(defaults)

		return json(data)
	} else if (params.collection && params.action === 'edit') {
		const collection = collections[params.collection]

		const fullPath = getPath(collection, params.slug)
		const file = await fs.readFile(fullPath, 'utf8')
		const { content, data: frontmatter } = matter(file)
		const metadata = YAML.parse(`${JSON.stringify(frontmatter)}\n`)
		const data = {
			...metadata,
			content: content.trim(),
		}

		return json(data)
	} else {
		// params.root === true
		const data = await Promise.all(
			Object.values(collections).map(async (collection) => {
				// @ts-ignore
				const fullPath = getPath(collection)
				const entries = await fg(fullPath, { onlyFiles: true })

				return {
					// @ts-ignore
					...collection,
					itemsCount: entries.length,
				}
			})
		)

		return json(data)
	}
}

type ActionHandlerArgs = ActionFunctionArgs & {
	config: Config<Collections>
}

export async function handleAction({ config, request }: ActionHandlerArgs) {
	const url = new URL(request.url)
	const params = parseAdminPathname({ pathname: url.pathname })
	const { collections } = config

	if (params?.collection && params.action) {
		const collection = collections[params.collection]
		const formData = await request.formData()
		const submission = await parse(formData, {
			schema: createSchema({
				collectionSchema: collection.schema,
				options: {
					async isSlugUnique(slug) {
						// TODO: check if slug is unique
						console.log(slug)
						return true
					},
				},
			}),
			async: true,
		})

		// TODO: data should have at least title and slug to be saved
		if (params.action === 'create' && submission.value) {
			const createdAt = new Date().toISOString()
			const frontmatterObj = {
				createdAt,
				...submission.value,
			}
			// @ts-ignore
			delete frontmatterObj.content

			const frontmatter = YAML.stringify(frontmatterObj).trimEnd()
			const markdown = submission?.value?.content

			const markdownFileContent = `---\n${frontmatter}\n---\n\n${markdown}\n`

			// TODO: if slug changes this will create a new file. keep track of old file name and rename or delete + recreate it.
			const fullPath = getPath(collection, submission?.value?.slug)
			const [filename] = fullPath.split('/').splice(-1)
			const dirPath = fullPath.replace(filename, '')
			fs.access(dirPath)
				.then(async () => {
					await fs.writeFile(fullPath, markdownFileContent)
				})
				.catch(async () => {
					await fs.mkdir(dirPath, { recursive: true })
					await fs.writeFile(fullPath, markdownFileContent)
				})
			const redirectUrl = `/rescribe/collections/${params.collection}/${submission?.value?.slug}`
			return redirect(redirectUrl)
		} else if (params.action === 'edit') {
			// read frontmatter from existing file and merge it with submission
			// so any extra fields in the frontmatter like `createdAt` is not lost while overwriting the field
			const filePath = getPath(collection, params.slug)
			const file = await fs.readFile(filePath, 'utf8')
			const { data } = matter(file)
			const metadata = YAML.parse(`${JSON.stringify(data)}\n`)
			const frontmatterObj = {
				...metadata,
				...submission.value,
			}
			delete frontmatterObj.content

			// get yaml string from json object
			const frontmatter = YAML.stringify(frontmatterObj).trimEnd()
			// get content from submission
			const markdown = submission?.value?.content
			// form markdown file string and write it to file
			const markdownFileContent = `---\n${frontmatter}\n---\n\n${markdown}\n`
			// TODO: if slug changes this will create a new file. keep track of old file name and rename or delete + recreate it.
			const fullPath = getPath(collection, submission?.value?.slug)
			await fs.writeFile(fullPath, markdownFileContent)

			return json({ message: 'updated' })
		}
	}

	return json({})
}
