import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";

export default [{
  input: './src/index.ts',
  output: {
    dir: './dist/es',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.prod.json'
    }),
    babel(),
    terser()
  ]
}, {
  input: './src/index.ts',
  output: {
    dir: './dist/cjs',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.prod.json',
      declaration: false,
      outDir: './dist/cjs',
    }),
    babel(),
    terser()
  ]
}]
