import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
	replaceNodeEnv: true,
	splitting: true,
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	skipNodeModulesBundle: true,
	entry: ['src/index.tsx'],
	outDir: 'dist',
	bundle: true,
	minify: true,
	name: '@rescribe/core',
}

export default defineConfig(config)
