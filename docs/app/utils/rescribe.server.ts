import { handleBlogLoader } from '@rescribe/blog'
import type { LoaderHandlerArgs } from '@rescribe/server'
import { createClient } from '@rescribe/server'
import { handleAction, handleLoader } from '@rescribe/server'

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
