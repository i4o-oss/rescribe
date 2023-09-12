import { refine } from '@conform-to/zod'
import type { Collection, Schema, SchemaKey } from '@rescribe/core'
import { REMIX_BASE_PATH } from '@rescribe/core'
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import YAML from 'yaml'
import { z } from 'zod'

export async function readItemsInCollection(collection: Collection) {
	const fullPath = getPath(collection)
	const entries = await fg(fullPath, { onlyFiles: true })
	const items = await Promise.all(
		entries.map(async (entry) => {
			const file = await fs.readFile(entry, 'utf8')
			const { data } = matter(file)
			const frontmatter = YAML.parse(`${JSON.stringify(data)}\n`)

			return {
				frontmatter,
			}
		})
	)

	return items
}

export async function getItemInCollectionFromSlug(
	collection: Collection,
	slug: string
) {
	const fullPath = getPath(collection, slug)
	const file = await fs.readFile(fullPath, 'utf8')
	const { content, data } = matter(file)
	const frontmatter = YAML.parse(`${JSON.stringify(data)}\n`)

	return {
		content,
		frontmatter,
	}
}

export function getPath(collection: Collection, slug = '') {
	const { format = 'md' } = collection
	if (slug) {
		return `${process.cwd()}${REMIX_BASE_PATH}/${collection.path.replace(
			'*',
			''
		)}${slug}.${format}`
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
