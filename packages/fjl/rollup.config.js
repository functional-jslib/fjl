import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import path from 'path';

export default {
  input: path.join(__dirname, './src/index.ts'),
  output: [{
    file: path.join(__dirname, './dist/index.es.min.js'),
    format: 'es',
    sourcemap: true
  }, {
    file: path.join(__dirname, './dist/index.iife.min.js'),
    format: 'iife',
    sourcemap: true,
    name: 'fjl'
  }],
  plugins: [
    typescript({
      tsconfig: path.join(__dirname, './tsconfig.json'),
    }),
    terser()
  ]
};
