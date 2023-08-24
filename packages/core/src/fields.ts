import type {
	BooleanField,
	DateField,
	SlugField,
	TextField,
	UrlField,
} from './types'
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

export function date({ description, label }: DateField) {
	return {
		description,
		label,
		type: FieldTypes.enum.date,
	}
}

export function slug({ description, label }: SlugField) {
	return {
		description,
		label,
		type: FieldTypes.enum.slug,
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

export function url({ description, label }: UrlField) {
	return {
		description,
		label,
		type: FieldTypes.enum.url,
	}
}
