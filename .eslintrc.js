module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb",
		"plugin:react/recommended",
		"eslint-plugin-vlad-path-checker-plugin",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["react"],
	rules: {
		"react/jsx-indent": [2, 4],
		"react/jsx-indent-props": [2, 4],
		indent: [2, 4],
		"react/jsx-filename-extension": [
			2,
			{ extensions: [".js", ".jsx", ".tsx"] },
		],
		"import/no-unresolved": "off",
		"import/prefer-default-export": "off",
		"no-unused-vars": "warn",
		"react/require-default-props": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-props-no-spreading": "warn",
		"react/function-component-definition": "off",
		"no-shadow": "off",
		"no-tabs": "off",
		"strict-boolean-expressions": "off",
		"prefer-nullish-coalescing": "off",
		"comma-dangle": "off",
		"import/extensions": "off",
		"eslint-plugin-vlad-path-checker-plugin/path-checker":
			["error", { alias: "@" }],
		"eslint-plugin-vlad-path-checker-plugin/public-api-imports":
			["error", { alias: "@" }],
	},
};
