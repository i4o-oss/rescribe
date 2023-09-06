import type { ContentPath, Schema, SchemaKey } from '@rescribe/core'

export interface UniqueArg {
	where: {
		slug: string
	}
}

export interface CollectionInterface {
	_format: string
	_label: string
	_path: ContentPath
	_schema: Schema<SchemaKey>
	_slug: string
	all: () => Promise<unknown[]>
	unique: (arg: UniqueArg) => Promise<unknown>
}

export interface RescribeClient {
	[key: string]: CollectionInterface
}
