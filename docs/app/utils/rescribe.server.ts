import { handleAction, handleLoader } from '@rescribe/server'

export async function handleLoaderForRescribe(args) {
	return await handleLoader(args)
}

export async function handleActionForRescribe(args) {
	return await handleAction(args)
}
