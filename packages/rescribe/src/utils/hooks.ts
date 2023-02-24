import { useCallback, useEffect, useState } from 'react'
import { getMdxHeadings } from './mdx'

function useHeadings(pathname: string) {
	let headings = []
	getMdxHeadings(pathname).then((res) => {
		headings = res
	})
	// useCallback(async () => {
	// 	const headings = await
	// 	console.log(headings)
	// 	setHeadings(headings)
	// }, [headings, pathname])

	return headings
}

export { useHeadings }
