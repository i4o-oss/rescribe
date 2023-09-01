import type { Collection } from '@rescribe/core'
import { REMIX_BASE_PATH } from '@rescribe/core'
import fg from 'fast-glob'

export async function readItemsInCollection(collection: Collection) {
	const { path } = collection
	const fullPath = `${process.cwd()}/${REMIX_BASE_PATH}/${path}.{md,mdx}`
	const entries = await fg(fullPath, { onlyFiles: true })

	return entries
}
