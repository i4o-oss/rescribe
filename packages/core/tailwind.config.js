/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	plugins: [require('@tailwindcss/typography')],
	prefix: 'rs-',
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
					states: 'hsl(var(--brand-states) / <alpha-value>)',
					foreground: 'hsl(var(--brand-foreground) / <alpha-value>)',
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
					subtle: 'hsl(var(--foreground-subtle) / <alpha-value>)',
				},
			},
		},
	},
}
