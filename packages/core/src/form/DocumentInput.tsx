import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight'
import { useContext } from 'react'
import { useRef } from 'react'

import { EditorContext } from '../providers'
import type { DocumentField, EditorProviderData } from '../types'

type DocumentInputProps = DocumentField & {
	schemaKey: string
}

export default function DocumentInput({ schemaKey }: DocumentInputProps) {
	const context = useContext<EditorProviderData | undefined>(EditorContext)
	const content = useRef<string>('')

	const editor = useEditor({
		content: content.current,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			BubbleMenuExt.configure({
				tippyOptions: {
					arrow: true,
				},
			}),
			Image.configure({
				inline: true,
				allowBase64: true,
				HTMLAttributes: {
					class: 'super-image',
				},
			}),
			CodeBlockLowlight.configure({
				lowlight,
			}),
			Youtube.configure({
				width: 762,
				height: 432,
			}),
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			Highlight.configure({ multicolor: true }),
			StarterKit.configure({
				heading: {
					levels: [2, 3, 4, 5, 6],
				},
			}),
		],
		onUpdate({ editor }) {
			let html = editor.isEmpty ? '' : editor.getHTML()
			const contentText = editor?.state?.doc?.textContent
			const wordCount = contentText?.split(' ').length
			setContent(html)
			context?.setWordCount(wordCount)
		},
	})

	function setContent(html: string) {
		content.current = html
	}

	return (
		<div className='editor-wrapper rs-flex rs-h-auto rs-min-h-max rs-w-full rs-items-start rs-justify-center rs-pb-12'>
			{/* {editor ? ( */}
			{/* 	<BubbleMenu editor={editor}>{activeToolbar}</BubbleMenu> */}
			{/* ) : null} */}
			<EditorContent editor={editor} />
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
