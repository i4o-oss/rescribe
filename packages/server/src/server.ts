import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import { parse } from '@conform-to/zod'
import { REMIX_BASE_PATH, parsePathname } from '@rescribe/core'
import type { Collections, Config } from '@rescribe/core'
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import YAML from 'yaml'

import { createSchema, getDefaults, readItemsInCollection } from './helpers'

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
		const collectionItems = await Promise.all(
			entries.map(async (entry) => {
				const file = await fs.readFile(entry, 'utf8')
				const { data } = matter(file)
				const metadata = YAML.parse(`${JSON.stringify(data)}\n`)

				return {
					...metadata,
				}
			})
		)
		return json({ items: collectionItems })
	} else if (params.collection && params.action === 'create') {
		const collection = collections[params.collection]
		const schema = createSchema({ collectionSchema: collection.schema })
		const defaults = getDefaults(schema)
		const data = schema.transform((val) => val).parse(defaults)

		return json(data)
	} else if (params.collection && params.action === 'edit') {
		const collection = collections[params.collection]

		const fullPath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${params.slug}.md`
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
		const formData = await request.formData()
		const submission = parse(formData, {
			schema: createSchema({
				collectionSchema: collection.schema,
				options: {
					async isSlugUnique(slug) {
						console.log(slug)
						return true
					},
				},
			}),
		})

		const createdAt = new Date().toISOString()
		const frontmatterObj = {
			title: formData.title,
			slug: formData.slug,
			excerpt: formData.excerpt,
			createdAt,
			publishedAt: formData.publishedAt,
			published: formData.published,
		}

		const frontmatter = YAML.stringify(frontmatterObj).trimEnd()
		const markdown = submission?.value?.content

		// TODO: find a better way to form markdown file content
		const markdownFileContent = `---\n${frontmatter}\n---\n\n${markdown}\n`

		// TODO: directories have to exist in order to write file. figure out if directories exist and create them.
		// TODO: if slug changes this will create a new file. keep track of old file name and rename or delete + recreate it.
		// TODO: this path only works for files with depth = 1 but glob allows nested directories. figure out how to get a working path regardless of how files are organized.
		const fullPath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${submission?.value?.slug}.md`
		await fs.writeFile(fullPath, markdownFileContent)
		//
		return redirect(
			`/rescribe/collections/${params.collection}/${formData.slug}`
		)
	} else if (params?.collection && params.action === 'edit') {
		const collection = collections[params.collection]
		const formData = await request.formData()
		const submission = await parse(formData, {
			schema: createSchema({
				collectionSchema: collection.schema,
				options: {
					async isSlugUnique(slug) {
						console.log(slug)
						return true
					},
				},
			}),
			async: true,
		})

		// read frontmatter from existing file and merge it with submission
		// so any extra fields in the frontmatter like `createdAt` is not lost while overwriting the field
		const filePath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${params.slug}.md`
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
		// TODO: this path only works for files with depth = 1 but glob allows nested directories. figure out how to get a working path regardless of how files are organized.
		const fullPath = `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${submission?.value?.slug}.md`
		await fs.writeFile(fullPath, markdownFileContent)

		return json({ message: 'updated' })
	}

	return json({})
}
