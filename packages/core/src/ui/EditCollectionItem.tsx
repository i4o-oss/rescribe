import { useLoaderData } from '@remix-run/react'

import { useState } from 'react'

import Form from '../form/Form'

export default function EditCollectionItem() {
	const defaultValue = useLoaderData()
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)
	const [wordCount, setWordCount] = useState<number>(0)

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
