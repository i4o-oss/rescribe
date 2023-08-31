import Boolean from '../form/Boolean'
import DateInput from '../form/DateInput'
import DocumentInput from '../form/DocumentInput'
import SlugInput from '../form/SlugInput'
import TextInput from '../form/TextInput'
import UrlInput from '../form/UrlInput'
import type { Field, SchemaKey } from '../types'

export default function InputRenderer({
	defaultValue,
	field,
	schemaKey,
}: {
	defaultValue?: unknown
	field: Field
	schemaKey: SchemaKey
}) {
	switch (field.type) {
		case 'boolean': {
			return (
				<Boolean
					defaultChecked={
						(defaultValue as boolean) || field.defaultChecked
					}
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'date': {
			return (
				<DateInput
					defaultValue={
						defaultValue
							? new Date(defaultValue as string)
							: undefined
					}
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'document': {
			return (
				<DocumentInput
					defaultValue={defaultValue as string}
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		// TODO: generate slug automatically when title field loses focus and not empty
		// this essentially ties the slug field to the title field and hence both are required fields but only for collections
		case 'slug': {
			return (
				<SlugInput
					defaultValue={defaultValue as string}
					description={field.description}
					label={field.label}
					schemaKey={schemaKey}
				/>
			)
		}
		case 'text': {
			return (
				<TextInput
					defaultValue={defaultValue as string}
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
					defaultValue={defaultValue as string}
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
