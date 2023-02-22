import { Switch } from '@i4o-oss/catalystui'
import type { RescribeConfig } from 'rescribe'
import { Theme, useTheme } from '~/utils/theme-provider'

function DarkModeToggle() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<Switch
			defaultChecked={theme === Theme.DARK}
			name='theme-switcher'
			onCheckedChange={toggleTheme}
		/>
	)
}

const config: RescribeConfig = {
	logo: '',
	sidebar: {
		links: [],
		search: true,
	},
	theme: {
		darkModeToggle: <DarkModeToggle />,
	},
}

export default config
