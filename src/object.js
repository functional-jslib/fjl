/**
 * @module object
 * @description Object operations/combinators.
 */

export * from './jsPlatform/object';
export * from './object/lookup';
export * from './object/typeOf';
export * from './object/copy';
export * from './object/is';
export * from './object/of';
export * from './object/searchObj';
export * from './object/assignDeep';
export * from './object/setTheory';
export * from './object/console';
export * from './object/jsonClone';
export * from './object/toArray';
export * from './object/assocList';

/**
* Returns whether constructor has derived object.
* @function module:object.instanceOf
* @param instanceConstructor {Function} - Constructor.
* @param instance {*}
* @returns {Boolean}
*/

/**
 * @function module:object.hasOwnProperty
 * @param propName {*}
 * @param typeInstance {*}
 * @returns {Boolean}
 */

/**
 * @function module:object.length
 * @param x {*}
 * @returns {Number}
 * @throws {Error} - Throws an error if value doesn't have a `length` property (
 *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
 */

/**
 * Gets own enumerable keys of passed in object (`Object.keys`).
 * @function module:object.keys
 * @param obj {*}
 * @returns {Array<String>}
 */

/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:object.assign
 * @param objs {...*}
 * @returns {Object}
*/
