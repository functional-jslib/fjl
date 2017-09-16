/**
 * Created by elyde on 12/6/2016.
 * @file fjlUncurried.js
 * @goal To include everything from haskell's Prelude (where it makes sense) (uncurried) in order to create
 *  a subset of functions which can make javascript developer more efficient and make his/her
 *  code more concise (and functional).
 * @description Includes operations from haskell's Prelude.
 * @motivation Haskell's Prelude, preludejs, lodash/fp, RamdaJs.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 * @todo any cross importing between packages should be done from the package object (package file: E.g., './src/functionOps/functionOps.js').
 * @module fjlUncurried
 */

export * from './uncurried/objectOps/objectOpsUncurried';
export * from './uncurried/functionOps/functionOpsUncurried';
export * from './uncurried/listOps/listOpsUncurried';

export {version} from   '../generated-for-src/version';
