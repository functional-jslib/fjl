/**
 * @module fjl
 * @description Exports all module methods (object, list, string modules etc.).
 * @inspiredby preludejs, lodash/fp, RamdaJs, Haskell.
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
 * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
 */
export * from './boolean';
export * from './data';
export * from './errorThrowing';
export * from './function';
export * from './list';
export * from './number';
export * from './object';
export * from './string';
export * from './types';
export * from './utils';

import * as platform from './platform';

export {platform};
