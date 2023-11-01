import { refine } from '@conform-to/zod'
import type { Collection, Schema, SchemaKey } from '@rescribejs/core'
import { REMIX_BASE_PATH } from '@rescribejs/core'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { promises as fsp } from 'node:fs'
import YAML from 'yaml'
import { z } from 'zod'

import { compileMdx } from './compile'
import { AllParams } from './types'
import { getMdxHeadings } from './utils/mdx'

export async function readItemsInCollection({
	collection,
	options,
}: {
	collection: Collection
	options?: AllParams
}) {
	const fullPath = getPath(collection)
	const entries = await fg(fullPath, { onlyFiles: false })
	const items = await Promise.all(
		entries.map(async (entry) => {
			const file = await fsp.readFile(entry, 'utf8')
			const { data } = matter(file)
			const frontmatter = YAML.parse(`${JSON.stringify(data)}\n`)
			const entryParts = entry
				.replace(process.cwd(), '')
				.replace(REMIX_BASE_PATH, '')
				.replace(
					collection.path.replace('**/*', '').replace('*', ''),
					''
				)
				.split('/')
			const _ = entryParts.pop()
			const filePath = entryParts.join('/') ? entryParts.join('/') : '/'

			return {
				filePath,
				frontmatter,
			}
		})
	)
	const sortedItems = items.sort(
		(a: any, b: any) =>
			new Date(b.frontmatter.createdAt).valueOf() -
			new Date(a.frontmatter.createdAt).valueOf()
	)

	if (options?.filter) {
		let filteredItems: { filePath: string; frontmatter: any }[] = []
		for (const key in options.filter) {
			const value = options.filter[key]

			filteredItems = sortedItems.filter(
				(item) =>
					item.frontmatter.hasOwnProperty(key) &&
					item.frontmatter[key] === value
			)
		}

		return filteredItems
	}

	return sortedItems
}

export async function getItemInCollectionFromSlug({
	collection,
	slug,
	options,
}: {
	collection: Collection
	slug: string
	options?: { headings: boolean }
}) {
	const fullPath = getPath(collection, slug)
	const file = await fsp.readFile(fullPath, 'utf8')
	const { content, data: frontmatter } = matter(file)
	const { code } = await compileMdx({
		source: content,
	})
	if (options?.headings) {
		const headings = await getMdxHeadings(fullPath)
		return {
			code,
			content,
			headings,
			frontmatter,
		}
	}

	return {
		code,
		content,
		frontmatter,
	}
}

export function getPath(collection: Collection, slug = '') {
	const { format = 'md' } = collection
	if (slug) {
		return `${process.cwd()}${REMIX_BASE_PATH}/${collection.path
			// TODO: replace should check for glob pattern from config
			.replace('**/*', '')
			.replace('*', '')}${slug}.${format}`
	} else {
		return `${process.cwd()}${REMIX_BASE_PATH}/${collection.path}.${format}`
	}
}

export function createSchema<key extends SchemaKey>({
	collectionSchema,
	options,
}: {
	collectionSchema: Schema<key>
	options?: {
		isSlugUnique?: (slug: string) => Promise<boolean>
	}
}) {
	const collectionSchemaEntries = Object.keys(collectionSchema).map((key) => {
		const item = collectionSchema[key as key]
		// TODO: add better zod types for slug and url
		switch (item.type) {
			case 'date': {
				return [key, z.coerce.date().default(new Date())]
			}
			case 'boolean': {
				return [key, z.boolean().default(false)]
			}
			case 'text': {
				if (key === 'slug') {
					// TODO: do async validation for slug if a function that checks its uniqueness is passed
					const slugSchema = z.string().superRefine((slug, ctx) =>
						refine(ctx, {
							validate: () => options?.isSlugUnique?.(slug),
							message: 'slug is already taken',
						})
					)
					return [key, slugSchema]
				}
			}
			default: {
				return [key, z.string().default('')]
			}
		}
	})

	return z.object(Object.fromEntries(collectionSchemaEntries))
}

export function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
	return Object.fromEntries(
		Object.entries(schema.shape).map(([key, value]) => {
			if (value instanceof z.ZodDefault) {
				return [key, value._def.defaultValue()]
			}
			return [key, undefined]
		})
	)
}
