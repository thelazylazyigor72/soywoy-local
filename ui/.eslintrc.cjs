module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"airbnb/hooks",
		"airbnb-typescript",
		"eslint-config-prettier",
	],
	overrides: [],
	ignorePatterns: [
		"dist",
		"vite.config.ts",
		"vitest.config.ts",
		"tests",
		"*.cjs",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "prettier"],
	rules: {},
};