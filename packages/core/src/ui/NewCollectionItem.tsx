import { Form } from '@remix-run/react'

import { useContext } from 'react'

import Boolean from '../form/Boolean'
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
					case 'boolean': {
						return (
							<Boolean
								defaultChecked={field.defaultChecked}
								description={field.description}
								label={field.label}
								key={key}
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
		<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
			<div className='rs-flex rs-h-full rs-w-full rs-max-w-3xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
				<Form className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
					{fields}
				</Form>
			</div>
		</main>
	)
}