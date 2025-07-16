import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ['vite.config.ts'],
    parserOptions: {
      project: './tsconfig.node.json',
    },
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@rememberall/backend/**',
                '!@rememberall/backend/**/',
                '!@rememberall/backend/**/input',
              ],
              allowTypeImports: true,
              message:
                'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
    },
  },
]);
