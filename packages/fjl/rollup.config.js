import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import * as path from 'path';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist/es',
    format: 'es'
  },
  plugins: [
    // nodeResolve(),
    // babel(),
    typescript({
      tsconfig: 'tsconfig.json'
    }),
  ]
}
