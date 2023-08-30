import Editor from '@i4o/oh-hi-markdown'
import { useRef } from 'react'

import type { DocumentField } from '../types'

type DocumentInputProps = DocumentField & {
	schemaKey: string
}

export default function DocumentInput({ schemaKey }: DocumentInputProps) {
	// const context = useContext<EditorProviderData | undefined>(EditorContext)
	const content = useRef<string>('')

	function setContent(value: () => string) {
		content.current = value()
	}

	return (
		<div className='editor-wrapper rs-flex rs-h-auto rs-min-h-max rs-w-full rs-max-w-3xl rs-items-start rs-justify-center rs-pb-12 [&_div.ProseMirror]:rs-mx-0'>
			<Editor
				onChange={setContent}
				placeholder='Start Writing...'
				value={content.current}
			/>
			<textarea
				className='rs-hidden'
				id={schemaKey}
				name={schemaKey}
				readOnly
				value={content.current}
			/>
		</div>
	)
}
