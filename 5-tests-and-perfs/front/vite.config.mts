/// <reference types="vitest">

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';


export default defineConfig(({mode}) => {
  return {
    plugins: [angular(), tsConfigPaths()],
    test: {
      global: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include:  ['src/**/*.spec.ts'],
      reporters: ['default']
    },
    define: {
      'import.meta.vitest' : mode !== 'production'
    }
  }
})
