import type { VFile } from '@mdx-js/mdx/lib/compile'
import fs from 'fs'
import { createProcessor } from '@mdx-js/mdx'
import remarkHeadings from './plugins/remark-headings'
import { readFilesInDir } from './fs'

async function readCurrentMdx({
    pathname,
    v2 = false,
}: {
    pathname: string
    v2?: boolean
}): Promise<VFile> {
    const matchedRoutes = await readFilesInDir(pathname, v2)

    const [matchedRoute] = matchedRoutes?.filter((item) => item)
    // @ts-ignore
    const [currentFile] = v2 ? [matchedRoute] : matchedRoute?.children?.filter(
        (child: unknown | null) => child
    )
    const input = await fs.promises.readFile(currentFile.path, 'utf8')
    const processor = createProcessor({
        remarkPlugins: [remarkHeadings],
    })
    const vfile = await processor.process(input)

    return vfile
}

async function getMdxHeadings(request: Request) {
    const { pathname } = new URL(request.url)
    const vfile = await readCurrentMdx({ pathname: pathname as string })
    const {
        data: { headings },
    } = vfile

    // TODO: Fix this type later
    // @ts-ignore
    const tocHeadings = headings.filter((heading) => heading.depth > 1)

    return tocHeadings
}

async function getMdxHeadingsForV2Routes(request: Request) {
    const { pathname } = new URL(request.url)
    const vfile = await readCurrentMdx({ pathname: pathname as string, v2: true })
    const {
        data: { headings },
    } = vfile

    // TODO: Fix this type later
    // @ts-ignore
    const tocHeadings = headings.filter((heading) => heading.depth > 1)

    return tocHeadings
}

export { getMdxHeadings, getMdxHeadingsForV2Routes }
