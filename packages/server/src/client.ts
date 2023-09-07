import type { Collection, Collections, Config } from '@rescribe/core'

import { getItemInCollectionFromSlug, readItemsInCollection } from './helpers'
import type { ClientReturn, CollectionInterface, RescribeClient } from './types'

export function createClient(config: Config<Collections>): RescribeClient {
	let client = {}

	for (const key in config.collections) {
		const collection = config.collections[key]
		client = Object.assign(client, {
			[key]: {
				...generateInterfaceForCollection(collection),
			},
		})
	}

	function generateInterfaceForCollection(collection: Collection) {
		let collectionInterface: CollectionInterface = {
			_format: collection?.format || 'md',
			_label: collection.label,
			_slug: collection.slug,
			_path: collection.path,
			_schema: collection.schema,

			async all(): Promise<ClientReturn[]> {
				return await readItemsInCollection(collection)
			},

			async unique({ where }): Promise<ClientReturn> {
				return await getItemInCollectionFromSlug(collection, where.slug)
			},
		}

		return collectionInterface
	}

	return client
}
