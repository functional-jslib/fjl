import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

export default {
  input: './src/index.ts',
  output: [{
    file: './dist/index.es.min.js',
    format: 'es',
    sourcemap: true,
  }, {
    file: './dist/index.iife.min.js',
    format: 'iife',
    sourcemap: true,
    name: 'fjl'
  }],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      rootDir: './src'
    }),
    terser()
  ]
}
