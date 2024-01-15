import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

export default defineConfig({
  plugins: [dts({
    include: ['src/**/*'],
    exclude: ['src/**/*.test.ts'],
    copyDtsFiles: true,
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: pkg.name,
      fileName: format => `${pkg.name}.${format}.js`,
    },
  },
})
