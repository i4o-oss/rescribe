import type { TextField } from '../types'
import { FieldTypes } from '../types'

export function text({ description, label, multiline = false }: TextField) {
	return {
		label,
		description,
		multiline,
		type: FieldTypes.enum.text,
	}
}
