/**
 * @module fjl
 * @description Exports all module methods (object, list, string modules etc.).
 * @goal to include everything from haskell's Prelude where it makes sense in order to create
 *  a subset of functions which can make the javascript developer more efficient and make his/her
 *  code more concise (and functional).
 * @motivation preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 */
export * from './object';
export * from './boolean';
export * from './function';
export * from './list';
export * from './string';
export * from './utils';
export * from './uncurried/_list/_utils';
