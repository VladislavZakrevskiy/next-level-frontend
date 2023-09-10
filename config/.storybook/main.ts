import type { StorybookConfig } from "@storybook/react-webpack5";
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';
import { Configuration, DefinePlugin, RuleSetRule } from "webpack";
import webpack from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';
import path from "path";

const config: StorybookConfig = {
	stories: [
		"../../src/**/*.mdx",
		"../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				backgrounds: false,
			},
		},
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
		"storybook-addon-mock/register",
		"storybook-addon-themes",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	webpackFinal: async (config: Configuration) => {
		const paths: BuildPaths = {
			build: "",
			entry: "",
			html: "",
			src: path.resolve(
				__dirname,
				"..",
				"..",
				"src"
			),
			buildLocales: "",
			locales: "",
		};
		config.resolve?.modules?.push(paths.src);
		config.resolve?.extensions?.push(
			".ts",
			".tsx"
		);
		config!.resolve!.alias = {
			...config!.resolve?.alias,
			"@": paths.src,
		};

		config!.module?.rules?.push(
			buildCssLoader(true)
		);
		config!.module!.rules =
			config.module!.rules!.map(
				(rule: undefined | null | false | "" | 0 | RuleSetRule | "...") => {
					if (typeof rule === 'object') {
            if (/svg/.test(rule?.test as string)) {
              return {
                ...rule,
                exclude: /\.svg$/i,
              };
            }
  
            return rule;
          }
				}
			);

		config?.plugins?.push(
			new DefinePlugin({
				__IS_DEV__: JSON.stringify(true),
				__API__: JSON.stringify(
					"http://testapi.ru"
				),
				__PROJECT__: JSON.stringify("storybook"),
			})
		);

		config.module?.rules.push(buildSvgLoader());

		return config;
	},
};
export default config;
