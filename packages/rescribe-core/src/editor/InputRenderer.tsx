import type { FieldConfig } from '@conform-to/react'

import Boolean from '../form/Boolean'
import DateInput from '../form/DateInput'
import DocumentInput from '../form/DocumentInput'
import SlugInput from '../form/SlugInput'
import TextInput from '../form/TextInput'
import UrlInput from '../form/UrlInput'
import type { Field } from '../types'

export default function InputRenderer({
	fieldConfig,
	fieldData,
}: {
	fieldConfig: FieldConfig<any>
	fieldData: Field
}) {
	switch (fieldData.type) {
		case 'boolean': {
			return <Boolean fieldConfig={fieldConfig} {...fieldData} />
		}
		case 'date': {
			return <DateInput fieldConfig={fieldConfig} {...fieldData} />
		}
		case 'document': {
			return <DocumentInput fieldConfig={fieldConfig} {...fieldData} />
		}
		// TODO: generate slug automatically when title field loses focus and not empty
		// this essentially ties the slug field to the title field and hence both are required fields but only for collections
		case 'slug': {
			return <SlugInput fieldConfig={fieldConfig} {...fieldData} />
		}
		case 'text': {
			return (
				<TextInput
					fieldConfig={fieldConfig}
					{...fieldData}
					isTitleField={fieldConfig.name === 'title'}
				/>
			)
		}
		case 'url': {
			return <UrlInput fieldConfig={fieldConfig} {...fieldData} />
		}
		default: {
			return null
		}
	}
}
