/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	plugins: [],
	prefix: 'rs-',
	theme: {
		extend: {
			colors: {
				rescribe: {
					accent: 'hsl(var(--rescribe-accent) / <alpha-value>)',
				},
			},
		},
	},
}
