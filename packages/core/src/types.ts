import { z } from 'zod'

export type Glob = '*' | '**'

export const FieldTypes = z.enum([
	'text',
	'slug',
	'image',
	'boolean',
	'document',
	'date',
	'url',
	'select',
	'multiselect',
])
export type FieldType = z.infer<typeof FieldTypes>

export type BasicField = {
	label: string
	description?: string
} & {
	type?: FieldType // FIXME: this is wrong but it works for now
}

export type TextField = BasicField & {
	multiline?: boolean
}

export type Field = TextField

// collection slug has to match the slug regex
export const collectionSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
export type CollectionSlug = z.infer<typeof collectionSlug>

export type Schema = Record<string, Field>

export type Collection = {
	label: string
	slug: CollectionSlug
	path: `${string}/${Glob}` | `${string}/${Glob}/${string}`
	schema: Schema
}

export interface Collections {
	[key: string]: Collection
}

export type Config<Collections> = {
	collections: Collections
} & ({} extends Collections ? {} : { collections: Collections })
