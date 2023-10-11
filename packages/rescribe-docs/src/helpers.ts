import { NavigationLink, PaginationLink } from './types'

export function getPrevAndNextPages(
	allPages: Record<string, NavigationLink>,
	root: string
) {
	const internalPages = Object.keys(allPages).filter((key) => {
		const value = allPages[key]
		if (typeof value !== 'string') {
			return !value?.external
		} else {
			return true
		}
	})
	const currentPageIndex = internalPages.findIndex((page) => {
		if (page === 'index' || page === '_index') {
			return location.pathname === `/${root}`
		} else {
			return location.pathname === `/${root}/${page}`
		}
	})

	const prevPageKey = internalPages.at(currentPageIndex - 1)
	const nextPageKey = internalPages.at(currentPageIndex + 1)

	const prevPageLink = prevPageKey ? allPages[prevPageKey] : null
	const nextPageLink = nextPageKey ? allPages[nextPageKey] : null

	const prevPage: PaginationLink | null =
		currentPageIndex !== 0
			? {
					link: prevPageKey as string,
					title:
						typeof prevPageLink === 'string'
							? prevPageLink
							: (prevPageLink?.title as string),
			  }
			: null
	const nextPage: PaginationLink | null =
		currentPageIndex !== internalPages.length - 1
			? {
					link: nextPageKey as string,
					title:
						typeof nextPageLink === 'string'
							? nextPageLink
							: (nextPageLink?.title as string),
			  }
			: null

	return { nextPage, prevPage }
}
