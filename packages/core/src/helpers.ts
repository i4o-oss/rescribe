import { z } from 'zod'

import { BASE_PATH_REGEX } from './constants'
import type { Schema, SchemaKey } from './types'

export function parsePathname(pathname: string) {
	const replaced = pathname.replace(BASE_PATH_REGEX, '')
	const parts =
		replaced === '' ? [] : replaced.split('/').map(decodeURIComponent)

	if (parts.length === 0) {
		return { root: true }
	}

	if (parts.length < 2 || parts[0] !== 'collections') return null

	const collection = parts[1]
	if (parts.length === 2) {
		return { collection }
	}
	if (parts.length === 3 && parts[2] === 'new') {
		return { collection, action: 'create' as const }
	}
	if (parts.length === 3 && parts[2] !== 'new') {
		const slug = parts[2]
		return { collection, action: 'edit' as const, slug }
	}

	return null
}

export function generateZodSchema<key extends SchemaKey>(
	collectionSchema: Schema<key>
) {
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
			default: {
				return [key, z.string().default('')]
			}
		}
	})

	const formDataSchema = z.object(Object.fromEntries(collectionSchemaEntries))

	return formDataSchema
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
