module.exports = {
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: '2022',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: ['react-refresh', 'import'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'import/no-default-export': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        "no-constant-condition": "off"
    },
    overrides: [
        {
            files: ['src/chat/components/message_components/MarkdownRenderer.tsx'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
};
