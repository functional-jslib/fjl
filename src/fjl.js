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
 * @todo any cross importing between packages should be done from the package object (package file: E.g., './src/functionOps/functionOps.js').
 * @todo decide how to include 'uncurried' members in the main export of the library.
 * @module fjl
 */

export * from './objectOps/objectOps';
export * from './booleanOps/booleanOps';
export * from './functionOps/functionOps';
export * from './listOps/listOps';
export * from './numberOps/numberOps';
export * from './stringOps/stringOps';
// export * from './compoundedOps/compoundedOps';

export {version} from   '../generated-for-src/version';
