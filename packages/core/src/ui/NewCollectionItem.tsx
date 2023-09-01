import { useContext, useState } from 'react'
import invariant from 'tiny-invariant'

import Form from '../form/Form'
import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	invariant(collection, 'collection cannot be undefined')
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)
	const [wordCount, setWordCount] = useState<number>(0)

	return (
		<Form
			sheetOpen={sheetOpen}
			setSheetOpen={setSheetOpen}
			wordCount={wordCount}
			setWordCount={setWordCount}
		/>
	)
}
