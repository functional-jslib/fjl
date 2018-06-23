/**
 * Created by elyde on 12/6/2016.
 * @file fjl.js
 * @goal to include everything from haskell's Prelude where it makes sense in order to create
 *  a subset of functions which can make the javascript developer more efficient and make his/her
 *  code more concise (and functional).
 * @description Includes operations from haskell's Prelude.
 * @motivation preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 * @module fjl
 */
export * from './object';
export * from './booleanOps';
export * from './functionOps';
export * from './listOps';
export * from './stringOps';
export * from './utils';
export * from './uncurried/_listOps/_utils';
