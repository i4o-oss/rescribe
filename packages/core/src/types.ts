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
}
export type TextField = BasicField & {
	multiline?: boolean
} & {
	type?: typeof FieldTypes.enum.text
}

export type BooleanField = BasicField & {
	defaultChecked?: boolean
} & {
	type?: typeof FieldTypes.enum.boolean
}

export type Field = BooleanField | TextField

// collection slug has to match the slug regex
export const collectionSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
export type CollectionSlug = z.infer<typeof collectionSlug>

type SpecialSchemaKeys = 'title'
export type SchemaKey = SpecialSchemaKeys | (string & {})
export type Schema<key extends SchemaKey> = Record<key, Field>

export type Collection = {
	label: string
	slug: CollectionSlug
	path: `${string}/${Glob}` | `${string}/${Glob}/${string}`
	schema: Schema<SchemaKey>
}

export interface Collections {
	[key: string]: Collection
}

export type Config<Collections> = {
	collections: Collections
} & ({} extends Collections ? {} : { collections: Collections })
