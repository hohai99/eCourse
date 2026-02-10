import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  },
  {
    rules: {
      'svelte/no-unused-svelte-ignore': 'off'
    }
  },
  {
    ignores: ['dist/', '.svelte-kit/', 'node_modules/', '.env', '.env.*']
  }
];
