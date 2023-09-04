import { refine } from '@conform-to/zod'
import type { Collection, Schema, SchemaKey } from '@rescribe/core'
import { REMIX_BASE_PATH } from '@rescribe/core'
import fg from 'fast-glob'
import { z } from 'zod'

export async function readItemsInCollection(collection: Collection) {
	const { path } = collection
	const fullPath = `${process.cwd()}/${REMIX_BASE_PATH}/${path}.{md,mdx}`
	const entries = await fg(fullPath, { onlyFiles: true })

	return entries
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
