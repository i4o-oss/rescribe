import { handleBlogLoader } from '@rescribejs/blog'
import { handleDocsLoader } from '@rescribejs/docs'
import type { LoaderHandlerArgs } from '@rescribejs/server'
import { createClient, handleAction, handleLoader } from '@rescribejs/server'
import path from 'node:path'
import {
	rescribeDocsConfig as docsConfig,
	configObj as rescribeConfig,
} from '~/rescribe.config'

if (process.platform === 'win32') {
	process.env.ESBUILD_BINARY_PATH = path.join(
		process.cwd(),
		'node_modules',
		'esbuild',
		'esbuild.exe'
	)
} else {
	process.env.ESBUILD_BINARY_PATH = path.join(
		process.cwd(),
		'node_modules',
		'esbuild',
		'bin',
		'esbuild'
	)
}

export async function handleLoaderForRescribe(args: LoaderHandlerArgs) {
	return await handleLoader(args)
}

export async function handleActionForRescribe(args: LoaderHandlerArgs) {
	return await handleAction(args)
}

export async function handleRescribeBlogLoader(args: LoaderHandlerArgs) {
	const client = createClient(args.config)
	const blog = client['blog']
	return await handleBlogLoader({ ...args, blog })
}

export async function handleRescribeDocsLoader(args: LoaderHandlerArgs) {
	const client = createClient(args.config)
	const docs = client['docs']
	return await handleDocsLoader({ ...args, docs, docsConfig, rescribeConfig })
}
