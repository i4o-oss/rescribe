import type { FieldConfig } from '@conform-to/react'
import { conform, useInputEvent } from '@conform-to/react'
import Editor from '@i4o/oh-hi-markdown'
import { useRef } from 'react'

import type { DocumentField } from '../types'

type DocumentInputProps = DocumentField & {
	fieldConfig: FieldConfig<any>
}

export default function DocumentInput({
	fieldConfig,
	...fieldData
}: DocumentInputProps) {
	// const context = useContext<EditorProviderData | undefined>(EditorContext)
	const content = useRef<string>(fieldConfig.defaultValue || '')
	const editorRef = useRef<HTMLTextAreaElement>(null)
	const control = useInputEvent({
		ref: editorRef,
	})

	function setContent(value: () => string) {
		content.current = value()
		control.change(content.current)
	}

	return (
		<div className='editor-wrapper rs-flex rs-h-auto rs-min-h-max rs-w-full rs-max-w-3xl rs-items-start rs-justify-center rs-pb-12 [&_div.ProseMirror]:rs-mx-0'>
			<Editor
				defaultValue={content.current}
				onChange={setContent}
				placeholder='Start Writing...'
			/>
			<textarea
				className='rs-hidden'
				{...conform.textarea(fieldConfig, { hidden: true })}
				ref={editorRef}
			/>
		</div>
	)
}
