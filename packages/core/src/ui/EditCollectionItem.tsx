import { useLoaderData } from '@remix-run/react'

import { useContext, useState } from 'react'
import invariant from 'tiny-invariant'

import Form from '../form/Form'
import { generateZodSchema } from '../helpers'
import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function EditCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	invariant(collection, 'collection cannot be undefined')
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)
	const [wordCount, setWordCount] = useState<number>(0)
	const schema = generateZodSchema(collection.schema)
	const data = useLoaderData()
	const defaultValue = schema.transform((val) => val).parse(data)

	return (
		<Form
			defaultValue={defaultValue}
			id='edit'
			sheetOpen={sheetOpen}
			setSheetOpen={setSheetOpen}
			wordCount={wordCount}
			setWordCount={setWordCount}
		/>
	)
}
