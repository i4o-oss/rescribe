import { z } from 'zod'

export type Glob = '*' | '**'

export type BasicField = {
	label: string
	description?: string
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

export type Config<Collections extends { [key: string]: Collection }> = {
	collections: Collections
} & ({} extends Collections ? {} : { collections: Collections })
