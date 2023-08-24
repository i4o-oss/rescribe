import { Form } from '@remix-run/react'

import { useContext } from 'react'

import Header from '../editor/Header'
import Boolean from '../form/Boolean'
import DateInput from '../form/DateInput'
import SlugInput from '../form/SlugInput'
import TextInput from '../form/TextInput'
import UrlInput from '../form/UrlInput'
import { CollectionContext } from '../providers'
import type { Collection, SchemaKey } from '../types'

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)

	const fields = collection?.schema
		? Object.keys(collection.schema).map((key: SchemaKey) => {
				const field = collection.schema[key]
				switch (field.type) {
					case 'boolean': {
						return (
							<Boolean
								defaultChecked={field.defaultChecked}
								description={field.description}
								key={key}
								label={field.label}
								schemaKey={key}
							/>
						)
					}
					case 'date': {
						return (
							<DateInput
								description={field.description}
								key={key}
								label={field.label}
								schemaKey={key}
							/>
						)
					}
					case 'slug': {
						return (
							<SlugInput
								description={field.description}
								key={key}
								label={field.label}
								schemaKey={key}
							/>
						)
					}
					case 'text': {
						return (
							<TextInput
								description={field.description}
								isTitleField={key === 'title'}
								key={key}
								label={field.label}
								multiline={field.multiline}
								schemaKey={key}
							/>
						)
					}
					case 'url': {
						return (
							<UrlInput
								description={field.description}
								key={key}
								label={field.label}
								schemaKey={key}
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
		<>
			<Header />
			<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
				<div className='rs-flex rs-h-full rs-w-full rs-max-w-3xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
					<Form className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
						{fields}
					</Form>
				</div>
			</main>
		</>
	)
}
