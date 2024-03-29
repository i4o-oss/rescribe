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
	name: '@rescribejs/server',
	external: ['@remix-run/node', 'esbuild'],
}

export default defineConfig(config)
