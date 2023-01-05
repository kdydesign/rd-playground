/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/eslint-config-prettier'
	],
	parserOptions: {/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'vue/multi-word-component-names': 'off',
		quotes: [ 1, 'single' ]
		// 'prettier/prettier': [
		// 	'error',
		// 	{
		// 		semi: false,
		// 		singleQuote: true,
		// 		trailingComma: 'none',
		// 		spaceBeforeFunctionParen: true
		// 	}
		// ]
	}
}

		ecmaVersion: 'latest'
	},
	rules: {
		'vue/multi-word-component-names': 'off',
		quotes: [ 1, 'single' ],
		'prettier/prettier': [
			'error',
			{
				semi: false,
				singleQuote: true,
				trailingComma: 'none',
				spaceBeforeFunctionParen: true
			}
		]
	}
}
