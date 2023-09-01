import { useFetcher, useLocation } from '@remix-run/react'

import { useForm } from '@conform-to/react'
import { IconButton, ScrollArea } from '@i4o/catalystui'
import type { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'
import invariant from 'tiny-invariant'

import Header from '../editor/Header'
import InputRenderer from '../editor/InputRenderer'
import { CollectionContext, EditorProvider } from '../providers'
import type { Collection, SchemaKey } from '../types'

type Props = {
	defaultValue: { [x: string]: any } | undefined
	id: string
	sheetOpen: boolean
	setSheetOpen: Dispatch<SetStateAction<boolean>>
	wordCount: number
	setWordCount: Dispatch<SetStateAction<number>>
}

const Form = ({
	defaultValue,
	id,
	sheetOpen,
	setSheetOpen,
	wordCount,
	setWordCount,
}: Props) => {
	const collection = useContext<Collection | null>(CollectionContext)
	invariant(collection, 'collection cannot be undefined')

	const { Form, state: fetcherState } = useFetcher()
	const [form, fields] = useForm({
		defaultValue,
		id,
	})
	const location = useLocation()

	const contentFields = Object.keys(collection.schema).filter(
		(key: SchemaKey) => key === 'title' || key === 'content'
	)
	const otherFields = Object.keys(collection.schema).filter(
		(key: SchemaKey) => key !== 'title' && key !== 'content'
	)

	const contentInputs =
		contentFields.length > 0
			? contentFields.map((key) => {
					const fieldData = collection.schema[key]
					const fieldConfig = fields[key]
					return (
						<EditorProvider
							data={{ wordCount, setWordCount }}
							key={key}
						>
							<InputRenderer
								fieldConfig={fieldConfig}
								fieldData={fieldData}
							/>
						</EditorProvider>
					)
			  })
			: null

	const otherInputs =
		otherFields.length > 0
			? otherFields.map((key) => {
					const fieldData = collection.schema[key]
					const fieldConfig = fields[key]
					return (
						<InputRenderer
							fieldConfig={fieldConfig}
							fieldData={fieldData}
							key={key}
						/>
					)
			  })
			: null

	return (
		<Form action={location.pathname} method='post' {...form.props}>
			<div className='rs-flex'>
				<ScrollArea
					className={`rs-flex rs-flex-shrink ${
						sheetOpen ? 'rs-w-[calc(100vw-24rem)]' : 'rs-w-full'
					} rs-h-full rs-bg-transparent`}
				>
					<Header
						fetcherState={fetcherState}
						sheetOpen={sheetOpen}
						setSheetOpen={setSheetOpen}
					/>
					<main className='rs-flex rs-content-start rs-items-stretch rs-justify-center rs-w-full rs-flex-grow rs-pb-16 rs-pt-24'>
						<div className='rs-flex rs-h-full rs-w-full rs-max-w-3xl rs-flex-col rs-items-center rs-text-foreground rs-justify-start rs-gap-12'>
							<div className='rs-w-full rs-flex rs-flex-col rs-gap-2'>
								{contentInputs}
							</div>
						</div>
					</main>
				</ScrollArea>
				<section
					className={`rs-w-96 rs-h-screen rs-flex rs-flex-col rs-gap-2 rs-px-8 rs-text-foreground rs-border-l rs-border-subtle rs-shadow-md ${
						sheetOpen ? 'rs-flex' : 'rs-hidden'
					}`}
				>
					<div className='rs-w-full rs-h-24 rs-flex rs-items-center rs-justify-between rs-gap-8'>
						<span className='rs-text-lg rs-font-semibold'>
							Settings
						</span>
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
					<div className='rs-w-full rs-flex rs-flex-col rs-gap-8'>
						{otherInputs}
					</div>
				</section>
			</div>
		</Form>
	)
}

export default Form
