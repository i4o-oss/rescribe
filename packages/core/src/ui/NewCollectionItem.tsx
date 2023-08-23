import { Form } from '@remix-run/react'

import { useContext } from 'react'

import TextInput from '../form/TextInput'
import { CollectionContext } from '../providers'
import type { Collection } from '../types'

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	// const location = useLocation()

	const fields = collection?.schema
		? Object.keys(collection.schema).map((key) => {
				const field = collection.schema[key]
				switch (field.type) {
					case 'text': {
						return (
							<TextInput
								description={field.description}
								label={field.label}
								key={key}
								multiline={field.multiline}
							/>
						)
					}
					default: {
						return null
					}
				}
		  })
		: null

	return (
		<main className='rs-flex rs-h-full rs-w-full rs-flex-col rs-items-center rs-justify-start rs-gap-12'>
			<Form className='rs-w-full'>{fields}</Form>
		</main>
	)
}
