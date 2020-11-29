/**
 * @module fjl
 * @description Exports all module methods (object, list, string modules etc.).
 * @goal to include as much as possible from haskell's Prelude, where it makes sense, in order a more functional
 * experience with typescript/javascript.
 * @inspiredby preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 */
export * from './object';
export * from './boolean';
export * from './function';
export * from './list';
export * from './string';
export * from './utils';
export * from './errorThrowing';

import * as platform from './platform';

export {platform};
