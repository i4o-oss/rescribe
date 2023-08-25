import { Form } from '@remix-run/react'

import { IconButton } from '@i4o/catalystui'
import * as Portal from '@radix-ui/react-portal'
import { useContext, useState } from 'react'

import Header from '../editor/Header'
import Boolean from '../form/Boolean'
import DateInput from '../form/DateInput'
import SlugInput from '../form/SlugInput'
import TextInput from '../form/TextInput'
import UrlInput from '../form/UrlInput'
import { CollectionContext } from '../providers'
import type { Collection, Field, SchemaKey } from '../types'

export function Input({
	field,
	schemaKey,
}: {
	field: Field
	schemaKey: SchemaKey
}) {
	switch (field.type) {
		case 'boolean': {
			return (
				<Boolean
					defaultChecked={field.defaultChecked}
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'date': {
			return (
				<DateInput
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'slug': {
			return (
				<SlugInput
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'text': {
			return (
				<TextInput
					description={field.description}
					isTitleField={schemaKey === 'title'}
					label={field.label}
					multiline={field.multiline}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'url': {
			return (
				<UrlInput
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		default: {
			return null
		}
	}
}

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	const [sheetOpen, setSheetOpen] = useState(false)

	const contentFields = collection?.schema
		? Object.keys(collection.schema).filter(
				(key: SchemaKey) => key === 'title'
		  )
		: []
	const otherFields = collection?.schema
		? Object.keys(collection.schema).filter(
				(key: SchemaKey) => key !== 'title'
		  )
		: []

	const contentInputs =
		collection?.schema && contentFields.length > 0
			? contentFields.map((key) => {
					const field = collection.schema[key]
					return <Input field={field} key={key} schemaKey={key} />
			  })
			: null

	const otherInputs =
		collection?.schema && otherFields.length > 0
			? otherFields.map((key) => {
					const field = collection.schema[key]
					return <Input field={field} key={key} schemaKey={key} />
			  })
			: null

	return (
		<>
			<Header setSheetOpen={setSheetOpen} />
			<main className='rs-relative rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-py-16'>
				<div className='rs-flex rs-h-full rs-w-full rs-max-w-3xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
					<Form className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
						{contentInputs}
					</Form>
				</div>
			</main>
			<Portal.Root>
				<section
					className={`rs-fixed rs-top-0 rs-bottom-0 rs-right-0 rs-w-[32rem] rs-flex rs-flex-col rs-px-8 rs-text-foreground rs-border-l rs-border-subtle rs-shadow-md ${
						sheetOpen ? 'rs-flex' : 'rs-hidden'
					}`}
				>
					<div className='rs-w-full rs-h-24 rs-flex rs-items-center rs-justify-end rs-gap-8'>
						<IconButton
							className='rs-w-8 rs-h-8 rs-p-1 !rs-bg-transparent'
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='rs-w-4 rs-h-4'
								>
									<rect
										width='18'
										height='18'
										x='3'
										y='3'
										rx='2'
										ry='2'
									/>
									<line x1='15' x2='15' y1='3' y2='21' />
								</svg>
							}
							onClick={() => setSheetOpen(false)}
						/>
					</div>
					<Form className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
						{otherInputs}
					</Form>
				</section>
			</Portal.Root>
		</>
	)
}
