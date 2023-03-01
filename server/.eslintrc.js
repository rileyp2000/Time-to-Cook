module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
		{
			"files": ["*.css"],
			"rules": {
				"brace-style": [
					"error",
					"1tbs",
					{
						"allowSingleLine": true
					}
				]
			}
		}
	],
	"parserOptions": {
		"sourceType": "module"
		//"ecmaVersion": "latest"
		//"sourceType": "module" //added this for import statements
	},
	"plugins": [
		"react",
		"indent"
	],
	"rules": {

		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": [
			"error",
			"always"
		],
		//each line of code has a max character of 120
		"max-len": [
			"error",
			{
				"code": 120,
				"ignoreComments": false,
				"ignoreTrailingComments": false,
				"ignoreUrls": true,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true,
				"ignoreRegExpLiterals": true
			}

		],
		//double quotes specifically for strings, and import statement can use one
		"quotes": [
			"error",
			"double",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"no-trailing-spaces": [
			"error"
		],
		//rules for indenting a tab after each level of line of code
		"indent": [
			"error",
			"2",
			{ "SwitchCase": 1 }
		],
		//json objects rules
		"comma-dangle": [
			"error",
			"never"
		],
		"quote-props": [
			"error",
			"consistent"
		],
		"no-multi-spaces": [
			"error"
		],
		"object-curly-newline": [
			"error",
			{
				"consistent": true
			}
		],
		"object-property-newline": [
			"error",
			{
				"allowAllPropertiesOnSameLine": true
			}
		]
	}
};
