import type { LoaderArgs } from '@remix-run/server-runtime'

import type {
	Collections,
	Config,
	ContentPath,
	Schema,
	SchemaKey,
} from '@rescribe/core'

export type LoaderHandlerArgs = LoaderArgs & {
	config: Config<Collections>
}

export interface UniqueArg {
	where: {
		slug: string
	}
}

export interface ClientReturn {
	content?: string
	frontmatter: unknown
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
