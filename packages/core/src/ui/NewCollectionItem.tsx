import { useContext, useState } from 'react'
import invariant from 'tiny-invariant'

import Form from '../form/Form'
import { generateZodSchema, getDefaults } from '../helpers'
import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	invariant(collection, 'collection cannot be undefined')
	const schema = generateZodSchema(collection.schema)
	const defaultValue = getDefaults(schema)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)
	const [wordCount, setWordCount] = useState<number>(0)

	return (
		<Form
			defaultValue={defaultValue}
			id='create'
			sheetOpen={sheetOpen}
			setSheetOpen={setSheetOpen}
			wordCount={wordCount}
			setWordCount={setWordCount}
		/>
	)
}
