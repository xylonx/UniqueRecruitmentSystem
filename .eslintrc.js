module.exports = {
    root: true,
    parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier',
    ],
    rules: {
        'max-len': ['warn', { code: 120 }],
        'quote-props': ['warn', 'as-needed'],
        'jsx-quotes': ['warn', 'prefer-single'],
        'arrow-parens': ['warn', 'always'],
        'no-empty': ['warn', { allowEmptyCatch: true }],
        'padded-blocks': ['warn', 'never'],
        'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        'no-trailing-spaces': ['warn'],
        'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 1 }],
        'object-curly-spacing': ['warn', 'always'],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    env: {
        es2021: true,
        browser: false,
        node: false,
    },
    overrides: [
        {
            files: ['*.spec.*', '*.test.*'],
            extends: [
                'plugin:jest/recommended',
            ],
            rules: {
                'jest/expect-expect': [
                    'warn',
                    {
                        assertFunctionNames: ['expect', 'agent.**.expect'],
                    },
                ],
            },
        },
        {
            files: ['*.jsx', '*.tsx'],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            extends: ['plugin:react/recommended'],
            rules: {
                'react/prop-types': 'off',
                'react/display-name': 'off',
                'react/jsx-closing-bracket-location': ['warn'],
                'react/jsx-closing-tag-location': ['warn'],
                'react/jsx-curly-newline': ['warn'],
                'react/jsx-first-prop-new-line': ['warn'],
                'react/jsx-tag-spacing': [
                    'warn',
                    {
                        closingSlash: 'never',
                        beforeSelfClosing: 'always',
                        afterOpening: 'never',
                        beforeClosing: 'never',
                    },
                ],
                'react/jsx-max-props-per-line': ['warn', { when: 'multiline' }],
                'react/jsx-indent': ['warn'],
                'react/jsx-indent-props': ['warn'],
            },
            settings: {
                react: {
                    version: 'latest',
                },
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:import/typescript', 'plugin:@typescript-eslint/base'],
            rules: {
                '@typescript-eslint/adjacent-overload-signatures': ['warn'],
                '@typescript-eslint/array-type': ['warn'],
                '@typescript-eslint/await-thenable': ['warn'],
                '@typescript-eslint/ban-types': [
                    'warn',
                    {
                        types: {
                            String: {
                                message: 'Use string instead',
                                fixWith: 'string',
                            },
                            Boolean: {
                                message: 'Use boolean instead',
                                fixWith: 'boolean',
                            },
                            Number: {
                                message: 'Use number instead',
                                fixWith: 'number',
                            },
                            Symbol: {
                                message: 'Use symbol instead',
                                fixWith: 'symbol',
                            },
                            Function: {
                                message: 'Specify the type of paramamters and return value explicitly',
                            },
                            '{}': {
                                message: 'Use Object instead',
                                fixWith: 'Object',
                            },
                            object: {
                                message: 'Use Object instead',
                                fixWith: 'Object',
                            },
                        },
                        extendDefaults: false,
                    },
                ],
                '@typescript-eslint/consistent-indexed-object-style': ['warn'],
                '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
                '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'no-type-imports' }],
                '@typescript-eslint/member-delimiter-style': ['warn'],
                '@typescript-eslint/method-signature-style': ['warn'],
                '@typescript-eslint/no-confusing-non-null-assertion': ['warn'],
                '@typescript-eslint/no-empty-interface': ['warn'],
                '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
                '@typescript-eslint/no-extra-non-null-assertion': ['warn'],
                '@typescript-eslint/no-floating-promises': [
                    'warn',
                    {
                        ignoreVoid: true,
                        ignoreIIFE: true,
                    },
                ],
                '@typescript-eslint/no-for-in-array': ['warn'],
                '@typescript-eslint/no-inferrable-types': ['warn'],
                '@typescript-eslint/no-misused-new': ['warn'],
                '@typescript-eslint/no-misused-promises': ['warn'],
                '@typescript-eslint/no-namespace': ['warn'],
                '@typescript-eslint/no-require-imports': ['warn'],
                '@typescript-eslint/no-this-alias': ['warn'],
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['warn'],
                '@typescript-eslint/no-unnecessary-condition': ['warn'],
                '@typescript-eslint/no-unnecessary-qualifier': ['warn'],
                '@typescript-eslint/no-unnecessary-type-arguments': ['warn'],
                '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],
                '@typescript-eslint/no-unnecessary-type-constraint': ['warn'],
                '@typescript-eslint/no-unsafe-assignment': ['warn'],
                '@typescript-eslint/no-unsafe-argument': ['warn'],
                '@typescript-eslint/no-unsafe-call': ['warn'],
                '@typescript-eslint/no-unsafe-member-access': ['warn'],
                '@typescript-eslint/no-unsafe-return': ['warn'],
                '@typescript-eslint/no-var-requires': ['warn'],
                '@typescript-eslint/non-nullable-type-assertion-style': ['warn'],
                '@typescript-eslint/prefer-as-const': ['warn'],
                '@typescript-eslint/prefer-for-of': ['warn'],
                '@typescript-eslint/prefer-includes': ['warn'],
                '@typescript-eslint/prefer-optional-chain': ['warn'],
                '@typescript-eslint/prefer-reduce-type-parameter': ['warn'],
                '@typescript-eslint/prefer-regexp-exec': ['warn'],
                '@typescript-eslint/prefer-string-starts-ends-with': ['warn'],
                '@typescript-eslint/restrict-plus-operands': ['warn', { checkCompoundAssignments: true }],
                '@typescript-eslint/restrict-template-expressions': ['warn'],
                '@typescript-eslint/triple-slash-reference': ['warn', { path: 'never', types: 'never', lib: 'never' }],
                '@typescript-eslint/type-annotation-spacing': ['warn'],
                '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }],
                'brace-style': 'off',
                '@typescript-eslint/brace-style': ['warn'],
                'comma-dangle': 'off',
                '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
                'comma-spacing': 'off',
                '@typescript-eslint/comma-spacing': ['warn'],
                'default-param-last': 'off',
                '@typescript-eslint/default-param-last': ['warn'],
                'dot-notation': 'off',
                '@typescript-eslint/dot-notation': ['warn'],
                'func-call-spacing': 'off',
                '@typescript-eslint/func-call-spacing': ['warn'],
                'keyword-spacing': 'off',
                '@typescript-eslint/keyword-spacing': ['warn'],
                'lines-between-class-members': 'off',
                '@typescript-eslint/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
                'no-array-constructor': 'off',
                '@typescript-eslint/no-array-constructor': ['warn'],
                'no-dupe-class-members': 'off',
                '@typescript-eslint/no-dupe-class-members': ['warn'],
                'no-duplicate-imports': 'off',
                '@typescript-eslint/no-duplicate-imports': ['warn'],
                'no-empty-function': 'off',
                '@typescript-eslint/no-empty-function': ['warn'],
                'no-extra-parens': 'off',
                '@typescript-eslint/no-extra-parens': ['warn', 'all', { ignoreJSX: 'all' }],
                'no-extra-semi': 'off',
                '@typescript-eslint/no-extra-semi': ['warn'],
                'no-implied-eval': 'off',
                '@typescript-eslint/no-implied-eval': ['warn'],
                'no-invalid-this': 'off',
                '@typescript-eslint/no-invalid-this': ['warn'],
                'no-loop-func': 'off',
                '@typescript-eslint/no-loop-func': ['warn'],
                'no-redeclare': 'off',
                '@typescript-eslint/no-redeclare': ['warn'],
                'no-throw-literal': 'off',
                '@typescript-eslint/no-throw-literal': ['warn'],
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': ['warn'],
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': ['warn'],
                'object-curly-spacing': 'off',
                '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
                quotes: 'off',
                '@typescript-eslint/quotes': [
                    'warn',
                    'single',
                    {
                        avoidEscape: true,
                    },
                ],
                'require-await': 'off',
                '@typescript-eslint/require-await': ['warn'],
                semi: 'off',
                '@typescript-eslint/semi': ['warn', 'always'],
                'space-before-function-paren': 'off',
                '@typescript-eslint/space-before-function-paren': [
                    'warn',
                    {
                        anonymous: 'always',
                        named: 'never',
                        asyncArrow: 'always',
                    },
                ],
                'space-infix-ops': 'off',
                '@typescript-eslint/space-infix-ops': ['warn', { int32Hint: false }],
            },
            settings: {
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx'],
                },
                'import/resolver': {
                    typescript: {
                        project: 'packages/*/tsconfig.json',
                    },
                },
            },
        },
    ],
};
