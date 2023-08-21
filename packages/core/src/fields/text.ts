import type { TextField } from '../types'

export function text({ description, label, multiline = false }: TextField) {
	return {
		label,
		description,
		multiline,
	}
}
