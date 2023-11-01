import type { LoaderFunctionArgs } from '@remix-run/server-runtime'

import type {
	Collections,
	Config,
	ContentPath,
	Schema,
	SchemaKey,
} from '@rescribejs/core'

export type LoaderHandlerArgs = LoaderFunctionArgs & {
	config: Config<Collections>
}

interface AllFilter {
	[key: string]: string | boolean
}

export interface AllParams {
	filter?: AllFilter
}

export interface UniqueArg {
	where: {
		slug: string
	}
	options?: {
		headings: boolean
	}
}

export interface AllReturn {
	frontmatter: unknown
}

export interface UniqueReturn {
	code: string
	content: string
	frontmatter: unknown
}

export interface CollectionInterface {
	_format: string
	_label: string
	_path: ContentPath
	_schema: Schema<SchemaKey>
	_slug: string
	all: (params: AllParams) => Promise<unknown[]>
	unique: (arg: UniqueArg) => Promise<unknown>
}

export interface RescribeClient {
	[key: string]: CollectionInterface
}
