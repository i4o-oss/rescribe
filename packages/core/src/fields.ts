import type { BooleanField, TextField } from './types'
import { FieldTypes } from './types'

export function boolean({
	defaultChecked = false,
	description,
	label,
}: BooleanField) {
	return {
		label,
		description,
		defaultChecked,
		type: FieldTypes.enum.boolean,
	}
}

export function text({ description, label, multiline = false }: TextField) {
	return {
		label,
		description,
		multiline,
		type: FieldTypes.enum.text,
	}
}
