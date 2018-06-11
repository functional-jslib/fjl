import {isArray, _isType} from './_is';
import {_assign, keys} from '../_jsPlatform/_object';

export const

    /**
     * Returns an associated list representing incoming value (object, array, etc.).
     * @note Does deep conversion on all values of direct type 'Object' (Pojo's).
     * @note Useful for working with object primitive (json and the like).
     * @note Note only convert objects of the same type of object given (so if object is for example of 'Object' type then
     *  only objects matching that type will be converted (to assoc-lists).
     * @function module:objectOps._toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = obj => !obj ? [] : keys(obj).map(key =>
        _isType(obj.constructor, obj[key]) ?
            [key, toAssocList(obj[key])] :
            [key, obj[key]]
    ),

    /**
     * Converts incoming object into an associated lists and all subsequently
     * all objects found at `key`
     * @function module:_objectOps._toAssocListOnKey
     * @param key {*} - Usually a string.
     * @param obj {*} - Object to convert on.
     * @returns {any[]} - Associated list
     */
    _toAssocListOnKey = (key, obj) => _toAssocListOnKeys([key], obj),

    /**
     * Converts all objects found at keys contained in `ks` to associated lists.  Additionally, only
     * values found that match the given constraint-type will be converted.  (Returns a copy of incoming object).
     * @note This method is recursive and will search the given objects tree recursively.
     * @note All objects in object tree are copies of original(s).
     * @function module:_objectOps._toAssocListOnKeys
     * @param ks {Array.<*>} - Keys.  Usually `Array.<String>`.
     * @param obj {*} - Object to convert on.
     * @param [objTypeConstraint=Object] {Constructor|Function} - Type constraint for key value.  Default `Object`.
     * @returns {Array}
     */
    _toAssocListOnKeys = (ks, obj, objTypeConstraint = Object) =>
        keys(obj).reduce((agg, key) => {
                const foundObj = obj[key],
                    matchesConstrainedType = (objTypeConstraint && _isType(objTypeConstraint, foundObj)),
                    keyValNeedsConversion = ks.includes(key) && matchesConstrainedType;
                if (keyValNeedsConversion) {
                    agg[key] = keys(foundObj).map(k => {
                        return _isType(objTypeConstraint, foundObj[k]) ?
                            [k, _toAssocListOnKeys(ks, foundObj[k], objTypeConstraint)] :
                            [k, foundObj]
                    });
                }
                return agg;
            }, _assign(objTypeConstraint ? new objTypeConstraint() : {}, obj)
        ),

    /**
     * From associated list to object.
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @returns {Object}
     */
    fromAssocList = xs => !xs ? {} : xs.reduce((agg, [key, value]) => {
        if (isArray(value) && isArray(value[0])) {
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
    _fromAssocListOnKey = (key, xs) => _fromAssocListOnKeys([key], xs),

    /**
     * Converts an associated list into an object and any subsequent key matching `keys`
     * @function module:objectOps.fromAssocListOnKeys
     * @param ks {Array.<String>} - Property keys array.
     * @param xs {Array|*} - Associated list.
     * @returns {Object}
     */
    _fromAssocListOnKeys = (ks, xs) => !xs ? [] : xs.reduce((agg, [k, value]) => {
        if (ks.includes(k) && isArray(value) && isArray(value[0])) {
            agg[k] = _fromAssocListOnKeys(ks, value);
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
    toArrayMap = toAssocList,

    /**
     * Converts an array-map into an object (one level).
     * @alias `fromAssocList`
     * @function module:objectOps.fromArrayMap
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = fromAssocList

;
