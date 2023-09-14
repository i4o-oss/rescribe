import { handleBlogLoader } from '@rescribe/blog'
import { handleDocsLoader } from '@rescribe/docs'
import type { LoaderHandlerArgs } from '@rescribe/server'
import { createClient, handleAction, handleLoader } from '@rescribe/server'
import {
	rescribeDocsConfig as docsConfig,
	configObj as rescribeConfig,
} from '~/rescribe.config'

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
