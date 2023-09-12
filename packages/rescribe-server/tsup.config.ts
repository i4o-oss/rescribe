import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
	replaceNodeEnv: true,
	splitting: true,
	clean: false,
	dts: true,
	format: ['cjs', 'esm'],
	skipNodeModulesBundle: true,
	entry: ['src/index.ts'],
	outDir: 'dist',
	bundle: true,
	minify: true,
	name: '@rescribe/server',
	external: ['@remix-run/node'],
}

export default defineConfig(config)
