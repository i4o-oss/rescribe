import { Form } from '@remix-run/react'

import { IconButton, ScrollArea } from '@i4o/catalystui'
import * as Portal from '@radix-ui/react-portal'
import { useContext, useState } from 'react'

import Header from '../editor/Header'
import InputRenderer from '../editor/InputRenderer'
import { CollectionContext, EditorProvider } from '../providers'
import type { Collection, SchemaKey } from '../types'

export default function NewCollectionItem() {
	const collection = useContext<Collection | null>(CollectionContext)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)
	const [wordCount, setWordCount] = useState<number>(0)

	const contentFields = collection?.schema
		? Object.keys(collection.schema).filter(
				(key: SchemaKey) => key === 'title' || key === 'content'
		  )
		: []
	const otherFields = collection?.schema
		? Object.keys(collection.schema).filter(
				(key: SchemaKey) => key !== 'title' && key !== 'content'
		  )
		: []

	const contentInputs =
		collection?.schema && contentFields.length > 0
			? contentFields.map((key) => {
					const field = collection.schema[key]
					return (
						<EditorProvider
							data={{ wordCount, setWordCount }}
							key={key}
						>
							<InputRenderer field={field} schemaKey={key} />
						</EditorProvider>
					)
			  })
			: null

	const otherInputs =
		collection?.schema && otherFields.length > 0
			? otherFields.map((key) => {
					const field = collection.schema[key]
					return (
						<InputRenderer
							field={field}
							key={key}
							schemaKey={key}
						/>
					)
			  })
			: null

	return (
		<>
			<ScrollArea className='rs-w-full rs-h-full rs-bg-transparent'>
				<Header setSheetOpen={setSheetOpen} />
				<main className='rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-pb-16 rs-pt-24'>
					<div className='rs-flex rs-h-full rs-w-full rs-max-w-3xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
						<Form className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
							{contentInputs}
						</Form>
					</div>
				</main>
			</ScrollArea>
			<Portal.Root>
				<section
					className={`rs-fixed rs-top-0 rs-bottom-0 rs-right-0 rs-w-[32rem] rs-flex rs-flex-col rs-gap-4 rs-px-8 rs-bg-white dark:rs-bg-[#010101] rs-text-foreground rs-border-l rs-border-subtle rs-shadow-md ${
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
