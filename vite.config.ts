import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

export default defineConfig({
  plugins: [dts({
    exclude: ['**/*.test.ts', 'node_modules/**/*'],
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: pkg.name,
      fileName: format => `${pkg.name}.${format}.js`,
    },
  },
})
