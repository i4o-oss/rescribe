import type { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'

export type Glob = '*' | '**'
export type ContentPath = `${string}/${Glob}` | `${string}/${Glob}/${string}`
export type CollectionFormat = 'md' | 'mdx'

export const FieldTypes = z.enum([
	'boolean',
	'date',
	'document',
	'image',
	'multiselect',
	'select',
	'slug',
	'text',
	'url',
])
export type FieldType = z.infer<typeof FieldTypes>

export type BasicField = {
	label: string
	description?: string
}
export type BooleanField = BasicField & {
	defaultChecked?: boolean
} & {
	type?: typeof FieldTypes.enum.boolean
}

export type DateField = BasicField & {
	type?: typeof FieldTypes.enum.date
}

export type DocumentField = BasicField & {
	type?: typeof FieldTypes.enum.document
}

export type TextField = BasicField & {
	multiline?: boolean
} & {
	type?: typeof FieldTypes.enum.text
}

export type SlugField = BasicField & {
	type?: typeof FieldTypes.enum.slug
}

export type UrlField = BasicField & {
	type?: typeof FieldTypes.enum.url
}

export type Field =
	| BooleanField
	| DateField
	| DocumentField
	| SlugField
	| TextField
	| UrlField

// collection slug has to match the slug regex
export const collectionSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
export type CollectionSlug = z.infer<typeof collectionSlug>

type SpecialSchemaKeys = 'content' | 'slug' | 'title'
export type SchemaKey = SpecialSchemaKeys | (string & {})
export type Schema<key extends SchemaKey> = Record<key, Field>

export type Collection = {
	format?: CollectionFormat
	label: string
	slug: CollectionSlug
	path: ContentPath
	schema: Schema<SchemaKey>
}

export interface Collections {
	[key: string]: Collection
}

export type Config<Collections> = {
	collections: Collections
} & ({} extends Collections ? {} : { collections: Collections })

export type EditorProviderData = {
	wordCount: number
	setWordCount: Dispatch<SetStateAction<number>>
}

export type RescribeData = {
	config: Config<Collections>
}
