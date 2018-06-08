define(['exports', './_is'], function (exports, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromArrayMap = exports.toArrayMap = exports._fromAssocListOnKeys = exports._fromAssocListOnKey = exports.fromAssocList = exports._toAssocListOnKeys = exports._toAssocListOnKey = exports.toAssocList = undefined;
    const

    /**
     * Returns an associated list representing incoming value (object, array, etc.).
     * @note Does deep conversion on all values of direct type 'Object' (Pojo's).
     * @note Useful for working with object primitive (json and the like).
     * @function module:objectOps._toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = exports.toAssocList = obj => !obj ? [] : Object.keys(obj).map(key => (0, _is.isObject)(obj[key]) ? [key, toAssocList(obj[key])] : [key, obj[key]]),


    /**
     * Converts incoming object into an associated lists and all subsequently
     * all objects found at `key`
     * @function module:_objectOps._toAssocListOnKey
     * @param key {*} - Usually a string.
     * @param obj {*} - Object to convert on.
     * @returns {any[]} - Associated list
     */
    _toAssocListOnKey = exports._toAssocListOnKey = (key, obj) => _toAssocListOnKeys([key], obj),


    /**
     * Converts incoming object into an associated lists and all subsequent
     * objects values found at key that is one of given `keys`
     * @function module:_objectOps._toAssocListOnKeys
     * @param keys {Array.<*>} - Usually `Array.<String>`.
     * @param obj {*} - Object to convert on.
     * @returns {any[]} - Associated list
     */
    _toAssocListOnKeys = exports._toAssocListOnKeys = (keys, obj) => !obj ? [] : Object.keys(obj).map(key => keys.includes(key) && (0, _is.isObject)(obj[key]) ? [key, _toAssocListOnKeys(keys, obj[key])] : [key, obj[key]]),


    /**
     * From associated list to object.
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @returns {Object}
     */
    fromAssocList = exports.fromAssocList = xs => !xs ? {} : xs.reduce((agg, [key, value]) => {
        if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
            agg[key] = fromAssocList(value);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, {}),


    /**
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param key {String|*}
     * @param xs {Array.<Array>} - Associated list.
     * @returns {*}
     */
    _fromAssocListOnKey = exports._fromAssocListOnKey = (key, xs) => _fromAssocListOnKeys([key], xs),


    /**
     * Converts an associated list into an object and any subsequent key matching `keys`
     * @function module:objectOps.fromAssocListOnKeys
     * @param keys {Array.<String>}
     * @param xs {Array|*} - Associated list.
     * @returns {Object}
     */
    _fromAssocListOnKeys = exports._fromAssocListOnKeys = (keys, xs) => !xs ? [] : xs.reduce((agg, [k, value]) => {
        if (keys.includes(k) && (0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
            agg[k] = _fromAssocListOnKeys(keys, value);
            return agg;
        }
        agg[k] = value;
        return agg;
    }, {}),


    /**
     * Returns an array map (associated list) representing incoming value (object, array, etc.).
     * @alias `toAssocList`
     * @function module:objectOps.toArrayMap
     * @param obj {(Object|Array|*)}
     * @returns {*}
     */
    toArrayMap = exports.toArrayMap = toAssocList,


    /**
     * Converts an array-map into an object (one level).
     * @alias `fromAssocList`
     * @function module:objectOps.fromArrayMap
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = exports.fromArrayMap = fromAssocList;
});