'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typeOf = typeOf;
/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */
var _Number = Number.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined';

/**
 * Returns the constructor/class/type name of a value.
 * @note Returns 'NaN' if value is of type `Number` and value is `isNaN`.
 * @note Returns 'Undefined' if value is `undefined`
 * @note Returns 'Null' if value is `null`
 * For values that have no concrete constructors and/or casters
 * (null, NaN, and undefined) we returned normalized names for them ('Null', 'NaN', 'Number')
 * @function module:_objectOps.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */
function typeOf(value) {
    var retVal = void 0;
    if (value === undefined) {
        retVal = _Undefined;
    } else if (value === null) {
        retVal = _Null;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
}