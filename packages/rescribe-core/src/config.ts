import type { Collection, Config } from './types'
import { collectionSlug } from './types'

export function config<Collections extends { [key: string]: Collection }>(
	config: Config<Collections>
) {
	return config
}

export function collection(collection: Collection) {
	const collectionObj: Collection = {
		...collection,
		slug: collectionSlug.parse(collection.slug),
	}

	return collectionObj
}
