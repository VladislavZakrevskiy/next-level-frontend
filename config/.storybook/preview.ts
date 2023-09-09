import { Preview } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { TranslationDecorator } from "../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { Theme } from "../../src/shared/consts/theme";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		layout: "fullscreen",
		themes: {
			default: 'light',
			list: [
				{name: 'light', class: Theme.LIGHT, color: "#fff"},
				{name: 'dark', class: Theme.DARK, color: "#000"},
				{name: 'orange', class: Theme.ORANGE, color: "#ffb005"},
			]
		}
	},
	decorators: [
		StyleDecorator,
		ThemeDecorator(Theme.LIGHT),
		RouterDecorator,
		TranslationDecorator,
		SuspenseDecorator,
	],
};

export default preview;
