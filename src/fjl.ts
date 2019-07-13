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
export * from './errorThrowing';

import * as jsPlatform from './jsPlatform';

export {jsPlatform};

/**
 * @typedef {String|Function|ArrayBufferConstructor|ArrayConstructor|BooleanConstructor|MapConstructor|NumberConstructor|SetConstructor|WeakMapConstructor|WeakSetConstructor} TypeRef
 * @description Type reference.  Either actual type or type's name;  E.g., `Type.name`
 * Also note: Class cased names are used for values that do not have `name`
 * properties;  Namely: for `null`, `NaN` and `undefined` the values
 * 'Null', 'NaN' and 'Undefined' are used, respectively.
 */
