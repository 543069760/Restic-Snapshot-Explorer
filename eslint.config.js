import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Fast Refresh 规则
      'react-refresh/only-export-components': [
        'warn', // 从 error 改为 warn
        {
          allowConstantExport: true, // 允许导出常量
          allowExportNames: ['metadata', 'generateMetadata', 'viewport'] // 允许导出特定名称
        }
      ],

      // React Hooks 规则
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript 规则调整
      '@typescript-eslint/no-explicit-any': 'warn', // 允许使用 any，但给出警告
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],

      // 纯函数规则
      'react-hooks/purity': 'warn', // 降低纯度检查级别

      // 其他有用的规则
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-namespace': 'off',

      // 通用规则
      'no-console': 'warn',
    },
  },
  // 针对特定目录的特殊规则
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off', // UI 组件完全关闭此规则
    },
  },
  // 针对特定文件的例外
  {
    files: ['src/components/ui/sidebar.tsx'],
    rules: {
      'react-hooks/purity': 'off', // 允许 sidebar 中的 Math.random
    },
  },
  // 开发环境特定规则
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ui/**/*'], // UI 组件已单独处理
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: ['config', 'options', 'defaultProps']
        }
      ],
    },
  },
]);