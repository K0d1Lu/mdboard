module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2017,
		sourceType: 'module',
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended'],
	plugins: ['vue'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/v-bind-style': ['warn', 'longform'],
		'vue/v-on-style': ['warn', 'longform'],
		'vue/no-v-html': 'off',
	},
}
