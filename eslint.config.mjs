// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/', 'build/', '*.d.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Regras gerais
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'warn',

      // Prettier
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'lf',
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
        },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off', // flexível, usa onde for necessário
      '@typescript-eslint/no-non-null-assertion': 'off', // não força remoção de `!`
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off', // permite usar `@ts-ignore` se necessário
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
