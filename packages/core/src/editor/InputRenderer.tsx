import Boolean from '../form/Boolean'
import DateInput from '../form/DateInput'
import DocumentInput from '../form/DocumentInput'
import SlugInput from '../form/SlugInput'
import TextInput from '../form/TextInput'
import UrlInput from '../form/UrlInput'
import type { Field, SchemaKey } from '../types'

export default function InputRenderer({
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
		case 'document': {
			return (
				<DocumentInput
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
