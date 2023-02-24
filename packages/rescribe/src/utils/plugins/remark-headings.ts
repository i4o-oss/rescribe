import { Heading as AstHeading } from 'mdast'

import type { Node } from 'unist-util-visit/lib'
import Slugger from 'github-slugger'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { VFileWithOutput } from 'unified'

export interface Heading {
	depth: number
	value: string
	properties?: { id: string }
	data?: any
}

const slugs = new Slugger()

export const hasHeadingsData = (
	data: unknown
): data is { headings: Heading[] } =>
	data instanceof Object &&
	data.hasOwnProperty('headings') &&
	// @ts-expect-error
	data.headings instanceof Array

export const headings = (root: Node) => {
	const headingList: Heading[] = []

	visit(root, 'heading', (node: AstHeading) => {
		const heading: Heading = {
			depth: node.depth,
			value: toString(node, { includeImageAlt: false }),
		}

		slugs.reset()

		heading.properties = {
			id: slugs.slug(heading.value),
		}

		// Other remark plugins can store arbitrary data
		// inside a node's `data` property, such as a
		// custom heading id.
		const data = node?.data
		if (data) {
			heading.data = data
		}

		headingList.push(heading)
	})

	return headingList
}

export default function remarkHeadings() {
	return (node: Node, file: VFileWithOutput<any>) => {
		file.data.headings = headings(node)
	}
}
