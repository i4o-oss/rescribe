import { createContext } from 'react'

import { RescribeBlogConfig } from './types'

export const RescribeBlogContext = createContext<
	RescribeBlogConfig | undefined
>({ title: 'Blog' })
